# Contributing to Arin's Portfolio

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and constructive in all interactions
- Provide helpful feedback and suggestions
- Test your changes thoroughly before submitting

## Getting Started

### 1. Fork & Clone

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR-USERNAME/Arin-s-Website.git
cd Arin-s-Website
git remote add upstream https://github.com/ArinPattnaik/Arin-s-Website.git
```

### 2. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
# or for bug fixes:
git checkout -b fix/describe-the-bug
```

### 3. Install & Test Locally

```bash
npm install
npm run dev
# Open http://localhost:3000 in your browser
```

## Development Guidelines

### Code Style

- **TypeScript**: Use strict typing; avoid `any` unless absolutely necessary
- **React**: Use functional components and hooks
- **Naming**: Use descriptive, camelCase names for variables and functions
- **Comments**: Add comments for complex logic; keep them clear and concise
- **Imports**: Organize imports at the top, group by type (react, libraries, local)

### Component Structure

```typescript
// ✅ GOOD
const MyComponent = ({ prop }: { prop: string }) => {
  return <div>{prop}</div>;
};

// ❌ AVOID
const MyComponent = (props: any) => {
  return <div>{props.anything}</div>;
};
```

### File Organization

```
src/
├── App.tsx              # Main app logic
├── main.tsx             # Entry point
├── index.css            # Global styles
└── components/          # Reusable components (optional)
    ├── Header.tsx
    └── Footer.tsx
```

### TypeScript Best Practices

- Define interfaces/types for all props and state
- Use `React.ReactNode` for children props
- Run `npm run lint` to check for type errors

## Before Submitting

### 1. Code Quality

```bash
# Check TypeScript compilation
npm run lint

# Build for production
npm run build

# Test locally
npm run preview
```

### 2. Testing Checklist

- [ ] Changes work locally (`npm run dev`)
- [ ] No TypeScript errors (`npm run lint`)
- [ ] Production build succeeds (`npm run build`)
- [ ] Changes are responsive (test mobile view)
- [ ] External links work correctly
- [ ] No console errors in DevTools

### 3. Git Workflow

```bash
# Commit with clear, descriptive messages
git commit -m "feat: add new animation component"
# OR
git commit -m "fix: correct typo in about section"
# OR
git commit -m "docs: update deployment guide"

# Types: feat, fix, docs, style, refactor, perf, test, chore

# Push to your fork
git push origin feature/your-feature-name
```

### 4. Pull Request

- Push to your forked repository
- Create a Pull Request to the `main` branch
- **Title**: Clear, descriptive (e.g., "Add new portfolio section")
- **Description**: Explain what changed and why
  - Link related issues if any
  - Include before/after screenshots for UI changes
  - Mention if this is breaking any existing functionality
- Wait for review

## Commit Message Format

Use conventional commits for clarity:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`

**Examples**:
```bash
git commit -m "feat(ui): add spotlight effect to project cards"
git commit -m "fix(scroll): resolve Lenis scroll conflict with Chrome 120"
git commit -m "docs: update deployment instructions for Vercel"
git commit -m "style: improve accessibility (WCAG AA compliance)"
```

## Project Structure & Key Files

```
Arin-s-Website/
├── src/App.tsx              # Main portfolio components (Hero, About, etc.)
├── index.html               # HTML template with meta tags
├── package.json             # Dependencies & build scripts
├── vite.config.ts           # Vite build configuration
├── tsconfig.json            # TypeScript configuration
├── README.md                # User documentation
├── CONTRIBUTING.md          # This file
├── DEPLOYMENT.md            # Deployment guides
└── LICENSE                  # MIT License
```

## Common Tasks

### Adding a New Section

1. Create new component function in `src/App.tsx`
2. Add section ID: `id="section-name"`
3. Export it and add to main return in `AppContent`
4. Update [DEPLOYMENT.md](./DEPLOYMENT.md) if adding navigation
5. Test responsive design

### Fixing a Bug

1. Create branch: `git checkout -b fix/bug-name`
2. Make your fix
3. Test: `npm run dev` && `npm run lint` && `npm run build`
4. Commit with `fix:` prefix
5. Submit PR with detailed explanation

### Updating Documentation

1. Edit relevant `.md` file
2. Ensure links are valid
3. Test formatting with markdown renderer
4. Commit with `docs:` prefix

## Asking Questions

- **GitHub Issues**: For bugs, feature requests, or discussions
- **Email**: [arinpattnaikofficial@gmail.com](mailto:arinpattnaikofficial@gmail.com)
- **Discussions Tab**: For questions and suggestions

## Resources

- [React 19 Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Guide](https://www.framer.com/motion/)
- [Vite Guide](https://vitejs.dev/guide/)

## Recognition

Contributors will be recognized:
- In commit history (GitHub automatically attributes commits)
- In project documentation if making significant contributions
- Thank you message in pull request reviews

---

**Thank you for contributing to make this portfolio better! 🎉**
