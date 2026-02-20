#!/usr/bin/env node
/**
 * Session Sharding Script
 * Processes .claude-sessions/*.jsonl files and creates RAG-ready markdown chunks
 * organized by topic.
 * 
 * Usage: node process-sessions.js [--output-dir=../_rag-output] [--source-dir=../.claude-sessions]
 */

const fs = require('fs');
const path = require('path');

// Configuration
const config = {
	sourceDir: '../.claude-sessions',
	outputDir: '../_rag-output',
	language: 'ru', // For metadata
};

// Parse command line arguments
process.argv.slice(2).forEach(arg => {
	const [key, value] = arg.replace(/^--/, '').split('=');
	if (key === 'output-dir') config.outputDir = value;
	if (key === 'source-dir') config.sourceDir = value;
});

// Resolve paths
const sourcePath = path.resolve(__dirname, config.sourceDir);
const outputPath = path.resolve(__dirname, config.outputDir);

// Topic detection patterns
const topicPatterns = {
	'bmad-help': {
		patterns: [/bmad-help/i, /workflow.*step/i, /что делать/i, /следующие шаги/i, /\/bmad-help/i],
		description: 'BMAD Workflow Guidance',
	},
	'bmad-pm-agent': {
		patterns: [/bmad-agent-bmm-pm/i, /product manager/i, /prd/i, /john.*pm/i, /create prd/i, /create brief/i, /\/bmad-agent-bmm-pm/i],
		description: 'BMAD Product Manager Agent',
	},
	'bmad-analyst': {
		patterns: [/bmad-agent.*analyst/i, /analyst/i, /mary.*analyst/i],
		description: 'BMAD Analyst Agent',
	},
	'bmad-architect': {
		patterns: [/bmad-agent.*architect/i, /winston.*architect/i, /architecture/i],
		description: 'BMAD Architect Agent',
	},
	'frontend-design': {
		patterns: [/frontend-design/i, /UI.*design/i, /tailwind/i, /css/i, /component/i, /\/frontend-design/i],
		description: 'Frontend Design & UI',
	},
	'code-init': {
		patterns: [/\/init/i, /CLAUDE\.md/i, /codebase analysis/i, /create a CLAUDE/i],
		description: 'Codebase Initialization',
	},
	'error-rate-limit': {
		patterns: [/rate.?limit/i, /hit your limit/i, /resets.*pm/i],
		description: 'Rate Limit Errors',
	},
	'system': {
		patterns: [/file-history-snapshot/i, /queue-operation/i],
		description: 'System Operations',
	},
	'general': {
		patterns: [],
		description: 'General Sessions',
	},
};

/**
 * Detect topics from message content
 */
function detectTopics(messages) {
	const topics = new Set();
	
	// Combine all content for pattern matching
	const allContent = messages.map(m => m.content || '').join(' ');
	
	// Also check original raw content patterns
	for (const [topic, data] of Object.entries(topicPatterns)) {
		for (const pattern of data.patterns) {
			if (pattern.test(allContent)) {
				topics.add(topic);
				break;
			}
		}
	}
	
	return Array.from(topics);
}

/**
 * Detect topics from raw JSONL content (for better detection)
 */
function detectTopicsFromRaw(rawContent) {
	const topics = new Set();
	
	for (const [topic, data] of Object.entries(topicPatterns)) {
		for (const pattern of data.patterns) {
			if (pattern.test(rawContent)) {
				topics.add(topic);
				break;
			}
		}
	}
	
	return Array.from(topics);
}

/**
 * Extract user messages from JSONL
 */
function extractMessages(lines) {
	const messages = [];
	
	for (const line of lines) {
		if (!line.trim()) continue;
		
		try {
			const obj = JSON.parse(line);
			
			// Skip system operations
			if (obj.type === 'file-history-snapshot' || obj.type === 'queue-operation') continue;
			
			// Extract meaningful content
			if (obj.message) {
				const msg = {
					type: obj.type,
					role: obj.message.role,
					content: extractContent(obj.message.content),
					timestamp: obj.timestamp,
					uuid: obj.uuid,
				};
				
				if (msg.content && msg.content.length > 10) {
					messages.push(msg);
				}
			}
		} catch (e) {
			// Skip parse errors
		}
	}
	
	return messages;
}

/**
 * Extract text content from message
 */
function extractContent(content) {
	if (typeof content === 'string') {
		// Clean up command markers
		return content
			.replace(/<command-message>.*?<\/command-message>/gs, '')
			.replace(/<command-name>.*?<\/command-name>/gs, '')
			.replace(/<local-command-.*?>/gs, '')
			.replace(/<agent-activation.*?<\/agent-activation>/gs, '')
			.trim();
	}
	
	if (Array.isArray(content)) {
		return content
			.map(c => {
				if (c.type === 'text') return c.text;
				if (c.type === 'tool_result') return `[Tool Result: ${c.content?.substring(0, 200)}...]`;
				if (c.type === 'tool_use') return `[Tool: ${c.name}]`;
				return '';
			})
			.filter(Boolean)
			.join('\n')
			.replace(/<command-message>.*?<\/command-message>/gs, '')
			.replace(/<command-name>.*?<\/command-name>/gs, '')
			.replace(/You must fully embody this agent's persona.*?<\/agent-activation>/gs, '')
			.trim();
	}
	
	return '';
}

/**
 * Format date from ISO string
 */
function formatDate(isoString) {
	if (!isoString) return 'Unknown';
	return new Date(isoString).toISOString().split('T')[0];
}

/**
 * Format time from ISO string
 */
function formatTime(isoString) {
	if (!isoString) return '';
	return new Date(isoString).toLocaleTimeString('ru-RU');
}

/**
 * Generate markdown from session
 */
function generateMarkdown(sessionId, messages, topics, sourceFile) {
	const date = messages[0]?.timestamp ? formatDate(messages[0].timestamp) : 'Unknown';
	const title = topics.length > 0 
		? `${topics.map(t => topicPatterns[t]?.description || t).join(' + ')}`
		: 'General Session';
	
	let md = `---
session_id: ${sessionId}
source_file: ${path.basename(sourceFile)}
date: ${date}
topics: [${topics.map(t => `"${t}"`).join(', ')}]
message_count: ${messages.length}
language: ru
---

# ${title}

**Session:** \`${sessionId.substring(0, 8)}...\`  
**Date:** ${date}  
**Topics:** ${topics.join(', ') || 'General'}

---

## Conversation

`;
	
	// Group messages into conversation turns
	let currentRole = null;
	let turnContent = [];
	
	for (const msg of messages) {
		if (msg.role !== currentRole) {
			if (turnContent.length > 0) {
				md += formatTurn(currentRole, turnContent);
				turnContent = [];
			}
			currentRole = msg.role;
		}
		turnContent.push(msg.content);
	}
	
	// Add final turn
	if (turnContent.length > 0) {
		md += formatTurn(currentRole, turnContent);
	}
	
	return md;
}

/**
 * Format a conversation turn
 */
function formatTurn(role, contents) {
	const label = role === 'user' ? 'USER' : 'ASSISTANT';
	
	const combined = contents
		.map(c => c.trim())
		.filter(c => c.length > 0)
		.join('\n\n')
		.substring(0, 4000); // Limit content length
	
	if (!combined) return '';
	
	return `### ${label}

${combined}

---

`;
}

/**
 * Process all JSONL files
 */
function processSessions() {
	console.log('[DIR] Source:', sourcePath);
	console.log('[DIR] Output:', outputPath);
	
	// Ensure output directory exists
	if (!fs.existsSync(outputPath)) {
		fs.mkdirSync(outputPath, { recursive: true });
	}
	
	// Get all JSONL files
	const files = fs.readdirSync(sourcePath)
		.filter(f => f.endsWith('.jsonl'));
	
	console.log(`\n[FILE] Found ${files.length} session files\n`);
	
	const stats = {
		total: files.length,
		processed: 0,
		byTopic: {},
	};
	
	// Process each file
	for (const file of files) {
		const filePath = path.join(sourcePath, file);
		const sessionId = file.replace('.jsonl', '');
		
		console.log(`Processing: ${file}`);
		
		try {
			const content = fs.readFileSync(filePath, 'utf-8');
			const lines = content.split('\n');
			const messages = extractMessages(lines);
			
			if (messages.length === 0) {
				console.log(`  ⚠️  No messages, skipping`);
				continue;
			}
			
			// Detect topics from both messages and raw content
			const topicsFromMessages = detectTopics(messages);
			const topicsFromRaw = detectTopicsFromRaw(content);
			const topics = [...new Set([...topicsFromMessages, ...topicsFromRaw])];
			
			const markdown = generateMarkdown(sessionId, messages, topics, file);
			
			// Output to root only - no subdirectories
			const outputFileName = `${sessionId}.md`;
			const outputPathFile = path.join(outputPath, outputFileName);
			fs.writeFileSync(outputPathFile, markdown);
			
			// Update stats
			stats.processed++;
			for (const topic of topics) {
				stats.byTopic[topic] = (stats.byTopic[topic] || 0) + 1;
			}
			
			console.log(`  [OK] ${messages.length} messages -> ${topics.join(', ')}`);
			
		} catch (err) {
			console.error(`  [ERR] Error: ${err.message}`);
		}
	}
	
	// Generate index
	generateIndex(stats);
	
	console.log('\n✅ Done!\n');
	console.log('Statistics:');
	console.log(`  Total files: ${stats.total}`);
	console.log(`  Processed: ${stats.processed}`);
	console.log('\nBy topic:');
	for (const [topic, count] of Object.entries(stats.byTopic)) {
		console.log(`  ${topic}: ${count}`);
	}
}

/**
 * Generate index.md with all sessions
 */
function generateIndex(stats) {
	const indexPath = path.join(outputPath, 'index.md');
	
	let md = `---
generated: ${new Date().toISOString()}
total_sessions: ${stats.processed}
---

# Session Knowledge Base Index

This directory contains processed conversation sessions organized by topic for RAG (Retrieval-Augmented Generation).

## Topics

| Topic | Description | Sessions |
|-------|-------------|----------|
`;
	
	for (const [topic, count] of Object.entries(stats.byTopic).sort((a, b) => b[1] - a[1])) {
		const desc = topicPatterns[topic]?.description || topic;
		md += `| [${topic}](./${topic}/) | ${desc} | ${count} |\n`;
	}
	
	md += `
## Usage for RAG

Each session file contains:
- YAML frontmatter with metadata (session_id, date, topics)
- Conversation turns between user and assistant
- Topic classification

## Update Command

To update this knowledge base:

\`\`\`bash
node _rag-sessions/process-sessions.js
\`\`\`

Or with custom paths:

\`\`\`bash
node _rag-sessions/process-sessions.js --source-dir=../.claude-sessions --output-dir=./_rag-output
\`\`\`

---

*Last updated: ${new Date().toLocaleString('ru-RU')}*
`;
	
	fs.writeFileSync(indexPath, md);
	console.log('\n📝 Generated index.md');
}

// Run
processSessions();
