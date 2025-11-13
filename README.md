```markdown
# Parth Bhatt — Portfolio Website

Welcome to the source code for my personal portfolio website: https://parthbhatt.me

This repository contains a fast, accessible, and responsive single-page portfolio built with Next.js and TypeScript. It is designed to highlight projects, experience, skills, certifications, and ways to get in touch.

---

Table of Contents
- [About](#about)
- [Live Demo](#live-demo)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure (Overview)](#project-structure-overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Install](#install)
  - [Development](#development)
  - [Build & Production](#build--production)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Design & Accessibility](#design--accessibility)
- [Contributing & Feedback](#contributing--feedback)
- [Troubleshooting & Tips](#troubleshooting--tips)
- [Acknowledgements](#acknowledgements)
- [License & Contact](#license--contact)

---

## About

This portfolio is a single-page application built to present my background and work clearly and professionally. It focuses on:

- Clean, minimal UI with a terminal-inspired theme and subtle animations.
- Mobile-first responsive design.
- Accessibility and SEO best practices.
- Easily updatable content via React/Next.js components.

The site is intended for potential employers, collaborators, and anyone interested in my work in cybersecurity and software development.

## Live Demo

Visit the live site: https://parthbhatt.me

## Key Features

- Single-page layout with smooth scrolling navigation.
- Fully responsive and optimized for mobile and desktop.
- Interactive UI components and subtle animations.
- Dynamic content rendered via React components (Next.js).
- Sections for About, Projects, Experience, Skills, Certifications, Achievements, and Contact.
- Accessible components (keyboard navigation, semantic HTML).
- Optimized for fast builds and deployment (Vercel-ready).

## Tech Stack

- Framework: Next.js
- Language: TypeScript
- Styling: Tailwind CSS
- UI primitives: Radix UI (for accessible unstyled components)
- Icons: Lucide React
- Package manager: pnpm
- Deployment: Vercel (recommended)

## Project Structure (Overview)

A typical layout for this repository:

- public/           — Static assets (images, favicons, etc.)
- src/
  - app/            — Next.js app routes and pages (if using app directory)
  - pages/          — Next.js pages (if using pages directory)
  - components/     — Reusable React components
  - styles/         — Global styles / Tailwind config
  - utils/          — Utility functions and helpers
- package.json
- tsconfig.json
- tailwind.config.js
- next.config.js

Note: The exact structure may vary—check the repository root for the current layout.

## Getting Started

### Prerequisites

- Node.js (>= 16 recommended)
- pnpm (preferred as package manager) — install via npm: `npm i -g pnpm`

### Install

Clone the repository and install dependencies:

```bash
git clone https://github.com/paarthbhatt/parth.git
cd parth
pnpm install
```

### Development

Start the development server (hot-reloads on change):

```bash
pnpm dev
```

Open http://localhost:3000 in your browser.

### Build & Production

Build the static/production assets:

```bash
pnpm build
```

Start the production server (if running locally):

```bash
pnpm start
```

## Available Scripts

- `pnpm dev` — Run the app in development mode.
- `pnpm build` — Produce an optimized production build.
- `pnpm start` — Start the production server (after build).
- `pnpm lint` — Run the linter (if configured).
- `pnpm format` — Format code with Prettier (if configured).

(Exact script names may vary — see package.json for the authoritative list.)

## Deployment

This site is ready for deployment to Vercel (recommended for Next.js apps):

1. Push to a GitHub repository.
2. Import the repository into Vercel.
3. Set any environment variables required by the app (if any).
4. Configure build command: `pnpm build` and output directory as default for Next.js.

Other platforms that support Node/Next.js can be used similarly.

## Design & Accessibility

- Built with accessibility in mind: semantic HTML, focus states, and keyboard navigation.
- Responsive across device sizes using Tailwind CSS utilities.
- Performance optimizations (image optimization, code-splitting) via Next.js features.
- SEO-friendly metadata and structured content.

## Contributing & Feedback

This is primarily my personal portfolio, but I welcome suggestions and improvements:

- Ideas, typos, or small improvements: please open an issue.
- Code contributions: open a pull request with a clear description of changes.
- For larger changes, open an issue first to discuss the approach.

When contributing, please follow the repository's code style and linting rules (if present).

## Troubleshooting & Tips

- If you have issues starting the project:
  - Ensure Node.js and pnpm versions meet the prerequisites.
  - Delete node_modules and lockfile then run `pnpm install` again.
- Linting or formatting errors: run the configured lint/format commands or check CI logs for guidance.
- If environment-specific behavior is needed, check for `.env.example` or docs in the repo.

## Acknowledgements

Thanks to the open-source projects and libraries used to build this site:
- Next.js
- Tailwind CSS
- Radix UI
- Lucide Icons
- pnpm

## License & Contact

- Author: Parth Bhatt
- Website: https://parthbhatt.me
- GitHub: https://github.com/paarthbhatt/parth

If you want to reach out, you can open an issue here on GitHub or contact me through the links on my site.

---
Last updated: 2025-11-13
```
