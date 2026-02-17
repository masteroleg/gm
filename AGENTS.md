# Agent Guidelines for genu.im Site

Static website for genu.im - a verification and transparency tool. Built with vanilla HTML/JS and Tailwind CSS v4.

## Build/Development Commands

```bash
# Development - watch mode for Tailwind CSS
npm run dev
# Equivalent to: npx tailwindcss -i ./assets/css/input.css -o ./assets/css/output.css --watch

# Production build (minified)
npm run build
# Equivalent to: npx tailwindcss -i ./assets/css/input.css -o ./assets/css/output.css --minify

# Serve built site locally
npm start
# Equivalent to: npx serve .

# Install dependencies
npm install
```

**Note:** This project uses Tailwind CSS v4. The input CSS file should be at `./assets/css/input.css` and builds to `./assets/css/output.css`.

**Pre-commit Hook:** Husky is configured to run `npm run build:css` on commit. If this script doesn't exist, update `.husky/pre-commit` to use `npm run build` instead.

## Project Structure

```
gm/
├── index.html              # Main landing page
├── perevir-product/        # Product verification subpage
│   └── index.html
├── assets/                 # Static assets (create if missing)
│   ├── css/
│   │   ├── input.css      # Tailwind source
│   │   └── output.css     # Generated CSS (gitignored)
│   ├── js/                # Vanilla JS files
│   ├── img/               # Images
│   └── favicon/           # Favicon files
├── tailwind.config.js     # Tailwind configuration
└── package.json
```

## Code Style Guidelines

### HTML

- Use semantic HTML5 elements (`<header>`, `<main>`, `<nav>`, `<footer>`)
- Include proper accessibility attributes (`aria-label`, `role`, `tabindex`)
- Use data attributes for i18n: `data-i18n="key.subkey"`
- Indent with tabs (consistent with existing files)
- Dark mode: use `dark:` prefix for Tailwind classes

### JavaScript

- ES6+ syntax preferred
- Use `const` and `let`, never `var`
- Arrow functions for callbacks
- Template literals for string interpolation
- Async/await for asynchronous operations
- Add `'use strict'` at the top of files

### Naming Conventions

| Category | Convention | Example |
|----------|-----------|---------|
| Variables/Functions | camelCase | `themeToggle`, `getElementById` |
| Constants | UPPER_SNAKE_CASE | `API_BASE_URL` |
| DOM IDs | camelCase | `themeToggle`, `langLabel` |
| CSS Classes | kebab-case | `main-nav__link`, `bg-gray-100` |
| Files | camelCase | `theme-toggle.js`, `lang-toggle.js` |

### Tailwind CSS

- Utility-first approach - avoid custom CSS when possible
- Responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`
- Dark mode: `dark:` prefix
- Custom colors defined in `tailwind.config.js`:
  - `brand`: `#00A95C` (primary brand color)
- Dark mode strategy: `class` (manual toggle)

### Accessibility

- All interactive elements must have `aria-label`
- Use proper heading hierarchy (h1 > h2 > h3)
- Ensure color contrast meets WCAG standards
- Keyboard navigation support
- Focus states: `focus:outline-none focus:ring-2 focus:ring-blue-500`

### Dark Mode Implementation

Toggle logic in `<head>` to prevent FOUC:
```javascript
if (localStorage.getItem('theme') === 'dark' || 
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
}
```

## Internationalization (i18n)

- Supports English (EN) and Ukrainian (UK)
- Translation keys in `data-i18n` attributes
- Language toggle updates content and `localStorage`
- Hreflang tags for SEO

## Performance

- Minify CSS for production (`npm run build`)
- Use `defer` attribute for scripts
- Optimize images before adding to `assets/img/`
- Lazy load below-fold images

## SEO Requirements

- Meta tags: title, description, Open Graph, Twitter Cards
- JSON-LD structured data
- Favicon and Apple touch icons
- Canonical URLs and hreflang tags
- Google Analytics integration

## Git Workflow

- Husky pre-commit hook runs Tailwind build
- Commit message: Conventional format preferred
- Don't commit `node_modules/` or `assets/css/output.css`

## Environment Notes

- No build step required for HTML/JS (static files)
- Tailwind CSS v4 uses new CLI syntax
- Windows paths in package.json scripts (`.\node_modules\.bin\`)
- Node.js >=14 recommended for Tailwind v4
