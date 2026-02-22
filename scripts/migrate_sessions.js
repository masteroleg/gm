'use strict';

/**
 * Миграция данных из Claude Sessions в BMAD fragments
 * Скрипт для конвертации сессий Claude в структурированные Markdown-фрагменты
 */

const fs = require('fs');
const path = require('path');

class MigrationError extends Error {
  constructor(message, originalError) {
    super(message);
    this.name = 'MigrationError';
    this.originalError = originalError;
  }
}

class ClaudeSessionMigrator {
  constructor(options = {}) {
    this.config = {
      sourceDir: options.sourceDir || 'migration/raw/.claude-sessions',
      targetDir: options.targetDir || '_bmad-output/knowledge/fragments',
      artifactsDir: options.artifactsDir || '_bmad-output/planning-artifacts',
      force: options.force || false,
      verbose: options.verbose || false
    };
    
    this.stats = {
      sessionsRead: 0,
      fragmentsCreated: 0,
      errors: 0,
      warnings: 0
    };
  }

  async migrate() {
    try {
      console.log('🚀 Начало миграции данных из Claude Sessions в BMAD fragments');
      
      await this.ensureTargetDirectories();
      await this.migrateSessions();
      await this.generateIndex();
      await this.generateOpenQuestions();
      
      this.printSummary();
      console.log('✅ Миграция завершена!');
      
    } catch (error) {
      console.error('❌ Ошибка при миграции:', error.message);
      if (error.originalError) {
        console.error('Оригинальная ошибка:', error.originalError);
      }
      process.exit(1);
    }
  }

  async ensureTargetDirectories() {
    try {
      const dirs = [
        this.config.targetDir,
        this.config.artifactsDir,
        path.join(this.config.targetDir, 'temp'),
        path.join(this.config.artifactsDir, 'temp')
      ];
      
      for (const dir of dirs) {
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
          if (this.config.verbose) {
            console.log(`📁 Создана директория: ${dir}`);
          }
        }
      }
    } catch (error) {
      throw new MigrationError('Не удалось создать директории для фрагментов', error);
    }
  }

  async migrateSessions() {
    try {
      const jsonFiles = await this.getJsonFiles();
      
      if (jsonFiles.length === 0) {
        console.log('❌ Не найдено ни одного JSONL файла в исходной директории');
        return;
      }

      console.log(`📋 Найдено ${jsonFiles.length} JSONL файлас для миграции`);
      
      for (const file of jsonFiles) {
        await this.processSessionFile(file);
      }
      
    } catch (error) {
      throw new MigrationError('Ошибка при миграции сессий', error);
    }
  }

  async getJsonFiles() {
    try {
      if (!fs.existsSync(this.config.sourceDir)) {
        throw new MigrationError(`Исходная директория не существует: ${this.config.sourceDir}`);
      }
      
      const files = fs.readdirSync(this.config.sourceDir);
      return files
        .filter(file => file.endsWith('.jsonl'))
        .map(file => path.join(this.config.sourceDir, file))
        .sort();
    } catch (error) {
      throw new MigrationError('Не удалось получить JSONL файлы', error);
    }
  }

  async processSessionFile(filePath) {
    try {
      console.log(`📄 Обрабатываю файл: ${path.basename(filePath)}`);
      
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n').filter(line => line.trim());
      
      if (lines.length === 0) {
        console.log(`⚠️ Пустой файл: ${path.basename(filePath)}`);
        return;
      }

      const messages = [];
      let sessionId = null;
      
      for (const line of lines) {
        try {
          const message = JSON.parse(line);
          
          if (!sessionId) {
            sessionId = message.sessionId;
          }
          
          messages.push(message);
        } catch (parseError) {
          console.log(`⚠️ Неверный JSON в строк: ${line.substring(0, 50)}...`);
          this.stats.warnings++;
        }
      }

      if (messages.length === 0) {
        console.log(`⚠️ Нет действительных сообщений в файле: ${path.basename(filePath)}`);
        return;
      }

      await this.extractFragments(messages, sessionId);
      this.stats.sessionsRead++;
      
    } catch (error) {
      console.error(`❌ Ошибка при обработке файла ${path.basename(filePath)}:`, error.message);
      this.stats.errors++;
    }
  }

  async extractFragments(messages, sessionId) {
    const fragments = [];
    const openQuestions = [];
    const decisions = [];
    const requirements = [];
    const links = [];

    // Фильтрация служебных сообщений
    const filteredMessages = messages.filter(message => {
      if (!message.role || !message.content) return false;
      
      // Игнорировать служебные сообщения
      const content = message.content.toLowerCase();
      return !(
        content.includes('snapshot') ||
        content.includes('progress') ||
        content.includes('thinking') ||
        content.includes('error') ||
        content.includes('debug') ||
        content.includes('warning') ||
        content.includes('info')
      );
    });

    // Извлечение BMAD артефактов
    for (const message of filteredMessages) {
      const content = message.content;
      
      // Выделение BMAD артефактов
      if (content.toLowerCase().includes('prd') || 
          content.toLowerCase().includes('product requirements document') ||
          content.toLowerCase().includes('product brief') ||
          content.toLowerCase().includes('architecture') ||
          content.toLowerCase().includes('epic') ||
          content.toLowerCase().includes('feature')) {
        
        const artifactName = this.extractArtifactName(content);
        const artifactType = this.determineArtifactType(content);
        
        const artifactPath = path.join(this.config.artifactsDir, `${artifactName}.md`);
        
        // Сохранить только если файл не существует
        if (!fs.existsSync(artifactPath)) {
          const artifactContent = this.createArtifactContent(
            artifactName, 
            artifactType, 
            content,
            sessionId,
            message.timestamp,
            message.role,
            message.author
          );
          
          fs.writeFileSync(artifactPath, artifactContent);
          
          if (this.config.verbose) {
            console.log(`📝 Сохранен BMAD артефакт: ${artifactName}.md`);
          }
        }
      }
      
      // Выделение вопросов
      const questionMatches = content.match(/(?<![.!?])\b(\w+\s*)+\?/g);
      if (questionMatches) {
        for (const question of questionMatches) {
          const cleanQuestion = question.trim().replace(/[\n\r]+/g, ' ').replace(/\s{2,}/g, ' ');
          if (cleanQuestion.length > 3) {
            openQuestions.push({
              question: cleanQuestion,
              sessionId,
              timestamp: message.timestamp,
              role: message.role,
              author: message.author
            });
          }
        }
      }

      // Выделение решений
      if (content.toLowerCase().includes('решение') || 
          content.toLowerCase().includes('решить') ||
          content.toLowerCase().includes('accept') ||
          content.toLowerCase().includes('agreed')) {
        decisions.push({
          decision: content,
          sessionId,
          timestamp: message.timestamp,
          role: message.role,
          author: message.author
        });
      }

      // Выделение требований
      if (content.toLowerCase().includes('требование') || 
          content.toLowerCase().includes('должен') ||
          content.toLowerCase().includes('нужно') ||
          content.toLowerCase().includes('should') ||
          content.toLowerCase().includes('must')) {
        requirements.push({
          requirement: content,
          sessionId,
          timestamp: message.timestamp,
          role: message.role,
          author: message.author
        });
      }

      // Выделение ссылок
      const linkMatches = content.match(/(https?:\/\/[\w\.\-]+(?:\/[^^\s]*)?)/g);
      if (linkMatches) {
        for (const link of linkMatches) {
          links.push({
            link: link,
            context: content,
            sessionId,
            timestamp: message.timestamp,
            role: message.role,
            author: message.author
          });
        }
      }
    }

    // Создание фрагментов
    if (filteredMessages.length > 0) {
      const fragmentContent = this.createFragmentContent(
        filteredMessages, 
        sessionId, 
        decisions, 
        requirements, 
        openQuestions, 
        links
      );
      
      const fragmentName = `fragment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}.md`;
      const fragmentPath = path.join(this.config.targetDir, fragmentName);
      
      fs.writeFileSync(fragmentPath, fragmentContent);
      this.stats.fragmentsCreated++;
      
      if (this.config.verbose) {
        console.log(`📝 Создан фрагмент: ${fragmentName}`);
      }
    }
  }

  extractArtifactName(content) {
    const lowerContent = content.toLowerCase();
    
    if (lowerContent.includes('prd') || lowerContent.includes('product requirements document')) {
      return 'PRD';
    } else if (lowerContent.includes('product brief')) {
      return 'ProductBrief';
    } else if (lowerContent.includes('architecture')) {
      return 'Architecture';
    } else if (lowerContent.includes('epic')) {
      return 'Epic';
    } else if (lowerContent.includes('feature')) {
      return 'Feature';
    }
    
    return 'Artifact' + Date.now();
  }

  determineArtifactType(content) {
    const lowerContent = content.toLowerCase();
    
    if (lowerContent.includes('prd') || lowerContent.includes('product requirements document')) {
      return 'PRD';
    } else if (lowerContent.includes('product brief')) {
      return 'ProductBrief';
    } else if (lowerContent.includes('architecture')) {
      return 'Architecture';
    } else if (lowerContent.includes('epic')) {
      return 'Epic';
    } else if (lowerContent.includes('feature')) {
      return 'Feature';
    }
    
    return 'General';
  }

  createArtifactContent(name, type, content, sessionId, timestamp, role, author) {
    return `# ${name}

**Type:** ${type}
**Source:** Claude Session
**Session ID:** ${sessionId}
**Timestamp:** ${timestamp}
**Extracted by:** ${role === 'user' ? 'User' : 'Assistant'}
**Author:** ${author}

---

${content}

---

*Generated by Claude Session Migration Tool*`;
  }

  createFragmentContent(messages, sessionId, decisions, requirements, openQuestions, links) {
    const messageContent = messages.map(msg => {
      const role = msg.role === 'user' ? 'Пользователь' : 'Ассистент';
      return `${role}: ${msg.content}`;
    }).join('\n\n');

    let fragment = `# Фрагмент

**Source:** Claude Session
**Session ID:** ${sessionId}
**Timestamp:** ${new Date().toISOString()}

## Содержание

${messageContent}

## Key Decisions

${decisions.map(dec => `- ${dec.decision}`).join('\n') || 'Нет важных решений'}

## Requirements

${requirements.map(req => `- ${req.requirement}`).join('\n') || 'Нет важных требований'}

## Open Questions

${openQuestions.map(q => `- ${q.question} (Session: ${q.sessionId})`).join('\n') || 'Нет открытых вопросов'}

## Links

${links.map(link => `- [${link.link}](${link.link}) - ${link.context.substring(0, 100)}...`).join('\n') || 'Нет ссылок'}

---

*Generated by Claude Session Migration Tool*`; 

    return fragment;
  }

  async generateIndex() {
    try {
      const indexContent = `# Индекс фрагментов

Миграционный инструмент для конвертации данных из Claude Sessions в BMAD fragments.

## Статистика

- **Сессий обработано:** ${this.stats.sessionsRead}
- **Создано фрагментов:** ${this.stats.fragmentsCreated}
- **Ошибки:** ${this.stats.errors}
- **Предупреждения:** ${this.stats.warnings}

## Фрагменты

${this.stats.fragmentsCreated > 0 ? '### Список фрагментов:\n\n' : ''}

---

*Generated on: ${new Date().toISOString()}*`;

      const indexPath = path.join(this.config.targetDir, 'index.md');
      fs.writeFileSync(indexPath, indexContent);
      
      if (this.config.verbose) {
        console.log(`📋 Создан index.md`);
      }
    } catch (error) {
      console.error('❌ Ошибка при создании index.md:', error.message);
    }
  }

  async generateOpenQuestions() {
    try {
      const openQuestionsContent = `# Open Questions

Дедуплицированный список вопросов, выявленных при миграции сессий Claude.

---

*Generated on: ${new Date().toISOString()}*`;

      const openQuestionsPath = path.join(this.config.targetDir, 'open-questions.md');
      fs.writeFileSync(openQuestionsPath, openQuestionsContent);
      
      if (this.config.verbose) {
        console.log(`📝 Создан open-questions.md`);
      }
    } catch (error) {
      console.error('❌ Ошибка при создании open-questions.md:', error.message);
    }
  }

  printSummary() {
    console.log('\n📊 Сводка миграции:');
    console.log(`• Обработано сессий: ${this.stats.sessionsRead}`);
    console.log(`• Создано фрагментов: ${this.stats.fragmentsCreated}`);
    console.log(`• Ошибки: ${this.stats.errors}`);
    console.log(`• Предупреждения: ${this.stats.warnings}`);
  }
}

// Запуск миграции с параметрами командной строки
if (require.main === module) {
  const migrator = new ClaudeSessionMigrator();
  migrator.migrate();
}

module.exports = ClaudeSessionMigrator;