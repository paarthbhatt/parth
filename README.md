<a id="top"></a>
<a href="#table-of-contents" aria-label="Skip to table of contents">Skip to table of contents</a>

# Parth Bhatt — Portfolio Website

Welcome — this repository contains the source code for my personal portfolio website: https://parthbhatt.me

This README includes a working Table of Contents (clickable links jump to the relevant sections). Each section also includes a "Back to Table of Contents" link to return to the navigation, improving accessibility and keyboard navigation.

---

<a id="table-of-contents"></a>
## Table of Contents
- [About](#about)
- [Live Demo](#live-demo)
- [Key Features](#key-features)
- [Tech Stack & Languages](#tech-stack--languages)
- [Project Structure (Overview)](#project-structure-overview)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Install](#install)
  - [Development](#development)
  - [Build & Production](#build--production)
- [Available Scripts](#available-scripts)
- [Deployment (Vercel)](#deployment-vercel)
- [Design, Accessibility & Performance](#design-accessibility--performance)
- [Contributing](#contributing)
- [Troubleshooting & Tips](#troubleshooting--tips)
- [Acknowledgements & Resources](#acknowledgements--resources)
- [License & Contact](#license--contact)

---

<a id="about"></a>
## About

This is a single-page portfolio built with Next.js and TypeScript. It is designed to highlight projects, experience, skills, certifications, and contact information in an accessible, responsive, and fast-loading format. The UI follows a terminal-inspired theme with subtle animations and focus on clarity.

Purpose:
- Serve as an online resume and project showcase.
- Demonstrate best practices in frontend development (TypeScript, accessibility, responsive design).
- Provide an easy-to-maintain codebase for iterative improvements.

[Back to Table of Contents](#table-of-contents)

---

<a id="live-demo"></a>
## Live Demo

Visit the live site: https://parthbhatt.me

[Back to Table of Contents](#table-of-contents)

---

<a id="key-features"></a>
## Key Features

- Single-page layout with smooth in-page navigation and keyboard-friendly focus order.
- Fully responsive (mobile-first) design.
- Interactive UI elements and small animations for engagement.
- Content rendered dynamically using React components (Next.js).
- Dedicated sections: About, Projects, Experience, Skills, Certifications, Achievements, Contact.
- Accessibility-first components (semantic HTML, ARIA where necessary, visible focus states).
- Optimized for fast builds and deploys (Vercel-ready).

[Back to Table of Contents](#table-of-contents)

---

<a id="tech-stack--languages"></a>
## Tech Stack & Languages

Primary technologies used:
- Next.js (React framework)
- TypeScript
- Tailwind CSS
- Radix UI (for accessible primitives)
- Lucide React (icons)
- pnpm (package manager)
- Vercel (deployment)

Language composition of the repo:
- TypeScript: 92%
- CSS: 7.9%
- JavaScript: 0.1%

[Back to Table of Contents](#table-of-contents)

---

<a id="project-structure-overview"></a>
## Project Structure (Overview)

A concise, common layout for this repo (adjust to actual folders as necessary):

- public/           — Static assets (images, favicons)
- src/
  - app/            — Next.js App Router routes (or pages/ if using Pages Router)
  - components/     — Reusable UI components
  - styles/         — Tailwind and global styles
  - data/           — Project/experience/certification content objects
  - utils/          — Utility functions and helpers
- package.json
- tsconfig.json
- tailwind.config.js
- next.config.js
- README.md

Check the repository root to confirm the exact structure used.

[Back to Table of Contents](#table-of-contents)

---

<a id="getting-started"></a>
## Getting Started

<a id="prerequisites"></a>
### Prerequisites

- Node.js (LTS recommended, v16+)
- pnpm (preferred package manager). Install with:

```bash
npm install -g pnpm
```

<a id="install"></a>
### Install

Clone and install dependencies:

```bash
git clone https://github.com/paarthbhatt/parth.git
cd parth
pnpm install
```

<a id="development"></a>
### Development

Run the development server (hot reload):

```bash
pnpm dev
```

Open http://localhost:3000 to view the site locally.

<a id="build--production"></a>
### Build & Production

Create an optimized production build:

```bash
pnpm build
```

Run the production server locally (after build):

```bash
pnpm start
```

[Back to Table of Contents](#table-of-contents)

---

<a id="available-scripts"></a>
## Available Scripts

Common scripts found in package.json (see package.json for the definitive list):

- pnpm dev — Run in development mode
- pnpm build — Build for production
- pnpm start — Start production server
- pnpm lint — Run linters
- pnpm format — Format code (if configured)

[Back to Table of Contents](#table-of-contents)

---

<a id="deployment-vercel"></a>
## Deployment (Vercel)

Recommended: Deploy to Vercel (first-class Next.js support).

Quick steps:
1. Push the repository to GitHub.
2. Log in to Vercel and import the GitHub repository.
3. Set build command to: `pnpm build`
4. Set any environment variables if needed (none required for a static portfolio in most cases).
5. Deploy — Vercel will handle automatic builds and previews on pull requests.

Alternative hosts: Netlify, GitHub Pages (static export), or any Node host supporting Next.js.

[Back to Table of Contents](#table-of-contents)

---

<a id="design-accessibility--performance"></a>
## Design, Accessibility & Performance

Accessibility:
- Semantic HTML and landmarks are used.
- Keyboard navigation and visible focus indicators are included.
- Radix UI primitives provide accessible behaviors for interactive components.

Performance:
- Next.js automatic code-splitting and image optimization help reduce load times.
- Tailwind CSS enables small CSS bundles by using utility classes.
- Use Lighthouse to audit performance, accessibility, and best practices.

SEO:
- Per-page metadata and structured content help search engines index the site.
- Social sharing metadata (Open Graph/Twitter cards) improves link previews.

[Back to Table of Contents](#table-of-contents)

---

<a id="contributing"></a>
## Contributing

This is primarily a personal portfolio repository, but contributions and suggestions are welcome.

How to contribute:
- Issues: Open an issue for bugs, typos, or suggestions.
- Pull Requests: Fork the repo, create a feature branch, and open a PR with a clear description of changes.
- Large changes: Open an issue first to discuss the approach.

When contributing, please:
- Follow TypeScript/React best practices used in the repo.
- Keep components accessible and responsive.
- Run linters/formatters before opening a PR.

[Back to Table of Contents](#table-of-contents)

---

<a id="troubleshooting--tips"></a>
## Troubleshooting & Tips

- If pnpm install fails: remove node_modules and pnpm-lock.yaml and try again.
- If the dev server doesn't start: verify Node version and check for stray environment variables.
- Linting/formatting: run pnpm lint or pnpm format (if configured).
- If images or assets don't show: confirm the files exist under public/ and that import paths are correct.

[Back to Table of Contents](#table-of-contents)

---

<a id="acknowledgements--resources"></a>
## Acknowledgements & Resources

Thanks to the open-source projects that power this site:
- Next.js
- Tailwind CSS
- Radix UI
- Lucide Icons
- pnpm

Helpful resources:
- Next.js docs — https://nextjs.org/docs
- Tailwind CSS — https://tailwindcss.com/docs
- Radix UI — https://www.radix-ui.com/

[Back to Table of Contents](#table-of-contents)

---

<a id="license--contact"></a>
## License & Contact

Author: Parth Bhatt  
Website: https://parthbhatt.me  
GitHub repo: https://github.com/paarthbhatt/parth

If you have questions or suggestions, open an issue or reach out via the contact links on the site.

[Back to Table of Contents](#table-of-contents)
