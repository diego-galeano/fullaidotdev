# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**fullai.dev** - AI consulting business website with a bold, futuristic design aesthetic. Currently implemented as a standalone HTML file, designed to be converted to Astro.js framework.

**Domain**: fullai.dev
**Tagline**: "Digital Backbone"
**Design Philosophy**: Modern, technical aesthetic that breaks away from typical AI consulting sites using neon accents, dark themes, and developer-focused typography.

## Current State

The project is now a fully configured Astro.js application. The main page is `src/pages/index.astro` containing the complete website with inline styles. The original `index.html` is preserved for reference.

## Design System

### Color Palette
```css
--color-bg: #0a0e17              /* Deep space background */
--color-surface: #141821          /* Dark slate */
--color-surface-elevated: #1a1f2e /* Card backgrounds */
--color-primary: #00ffa3          /* Neon green accent */
--color-accent: #00d4ff           /* Electric blue */
--color-text: #e8edf4             /* Off-white */
--color-text-dim: #98a2b3         /* Muted blue-gray */
--color-border: #2a3142           /* Subtle borders */
```

### Typography
- **Display font**: Syne (bold, geometric, modern) - used for headlines and titles
- **Body/Code font**: JetBrains Mono (technical, clean) - used for body text and code blocks
- Both fonts loaded via Google Fonts

### Key Visual Elements
- Animated floating gradient orbs with blur effects
- Pulsing grid overlay on hero section
- macOS-style code window with syntax-highlighted Python example
- Service cards with gradient top borders and hover effects
- Smooth scroll-triggered animations

## Site Structure

### Sections
1. **Navigation**: Fixed header with logo and CTA
2. **Hero**: Full-screen with "Digital Backbone" headline, animated background
3. **Services**: 4-card grid showcasing offerings
   - AI Strategy & Architecture
   - Custom AI Development
   - Rapid Prototyping
   - Integration & Deployment
4. **Approach**: Split layout with "Build. Measure. Evolve." methodology and code window
5. **Contact**: Email (hello@fullai.dev) and scheduling cards
6. **Footer**: Branding and navigation links

## Assets

### Logo
- Filename: `fullaidevhighresolutionlogo.png`
- Current location: Should be in `public/` directory
- Usage: Navigation and footer
- The logo features a wrench-and-cheese design in cyan/mint colors

## Project Structure

```
fullaidotdev/
├── src/
│   └── pages/
│       └── index.astro          # Main website page
├── public/
│   ├── favicon.svg
│   └── fullaidevhighresolutionlogo.png  # Logo (needs to be added)
├── astro.config.mjs
├── tsconfig.json
├── package.json
├── CLAUDE.md                     # This file
├── DESIGN_OVERVIEW.md            # Design documentation
└── index.html                    # Original HTML (reference)
```

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:4321)
npm run build        # Production build (output to dist/)
npm run preview      # Preview production build
```

## Future Improvements

Consider breaking out reusable components:
- ServiceCard component for the 4 service cards
- CodeWindow component for the Python code display
- ContactCard component for contact methods
- Navigation component
- Footer component

This would improve maintainability while keeping the same visual design.

## Content Guidelines

- Maintain "Digital Backbone" branding throughout
- Keep technical, developer-focused tone
- Use code examples and technical metaphors
- Avoid generic corporate language
- Focus on AI implementation, not just strategy

## Animation Philosophy

All animations should be smooth and purposeful:
- Hero elements: Staggered fade-in-up (1s delays)
- Service cards: Lift on hover with border glow
- Code window: Static but visually prominent
- Logo: Subtle float animation (3s infinite)
- Grid overlay: Gentle pulse (4s infinite)

## Responsive Breakpoints

- Mobile: < 640px (single column, hide secondary nav links)
- Tablet: < 968px (stack approach section, single-column stats)
- Desktop: ≥ 968px (full grid layouts)
