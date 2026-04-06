# Arin Pattnaik - Personal Portfolio

A modern, interactive portfolio website showcasing data analysis expertise, predictive modeling projects, and visualization work. Built with React, TypeScript, Tailwind CSS, and smooth animations.

**Live**: [arinpattnaik.me](https://arinpattnaik.me)  
**Repository**: [github.com/ArinPattnaik/Arin-s-Website](https://github.com/ArinPattnaik/Arin-s-Website)

## ✨ Features

- **Smooth Scrolling** — Custom Lenis scroll behavior for premium feel
- **Animations** — Framer Motion components with staggered text entry and scroll effects  
- **Responsive Design** — Mobile-first approach with Tailwind CSS
- **Spotlight Cards** — Interactive cards with mouse-tracking effects
- **Optimized SEO** — Open Graph meta tags for social sharing
- **TypeScript** — Full type safety across codebase
- **Modern Stack** — React 19, Vite, Tailwind CSS 4, TypeScript 5.8

## 🚀 Quick Start

### Prerequisites
- **Node.js** >= 18 (recommended 20+)
- **npm** >= 10 (or your preferred package manager: yarn, pnpm)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ArinPattnaik/Arin-s-Website.git
   cd Arin-s-Website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local if needed (for API keys, etc.)
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   The site will open at [http://localhost:3000](http://localhost:3000)

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start dev server (port 3000)

# Production
npm run build        # Build for production (outputs to dist/)
npm run preview      # Preview production build locally

# Quality
npm run lint         # Type check with TypeScript
npm run clean        # Remove build artifacts

```

## 📂 Project Structure

```
.
├── src/
│   ├── App.tsx              # Main app component with error boundary
│   ├── main.tsx             # React entry point
│   └── index.css            # Global styles & Tailwind imports
├── index.html               # HTML template with meta tags
├── package.json             # Dependencies & scripts
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite bundler config
├── tailwind.config.ts       # Tailwind CSS theme
├── .env.example             # Environment variables template
└── README.md                # This file
```

## 🛠️ Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Framework** | React | 19.0.0 |
| **Language** | TypeScript | ~5.8.2 |
| **Styling** | Tailwind CSS | 4.1.14 |
| **Animations** | Framer Motion | 12.23.24 |
| **Bundler** | Vite | 6.2.0 |
| **HTTP Client** | lucide-react icons | 0.546.0 |
| **Scroll** | Lenis | 1.3.21 |
| **Utilities** | clsx, tailwind-merge | Latest |

## 🎨 Customization

### Colors & Theme
- Edit `src/index.css` for global theme (background, text colors)
- Tailwind config is in `vite.config.ts` under `@tailwindcss/vite` plugin

### Content
- **Hero Section**: Edit `Hero()` component in `src/App.tsx`
- **About Text**: Modify `About.text` variable
- **Expertise Items**: Update `tools` array in `Expertise()`
- **Project Showcase**: Modify `projects` array in `Works()`
- **Testimonials**: Update `insights` array in `Insights()`
- **Contact**: Edit footer email and social links in `Footer()`

### Performance
- Images are lazy-loaded via Framer Motion `whileInView`
- Scroll animations use `useScroll` for smooth performance
- Error boundary catches rendering errors in production

## 🚢 Deployment

This site is optimized for **Vercel** but works with any static host (Netlify, GitHub Pages, etc.).

### Deploy to Vercel (Recommended)

1. **Push to GitHub** (if not already done)
   ```bash
   git remote add origin https://github.com/ArinPattnaik/Arin-s-Website.git
   git branch -M main
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Visit [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Framework: **React**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Click **Deploy**

3. **Add Custom Domain**
   - In Vercel dashboard: Settings → Domains
   - Add `arinpattnaik.me`
   - Follow DNS setup instructions from your registrar

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed guides (Netlify, GitHub Pages, Docker).

## 📋 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Example (adjust based on your needs)
VITE_API_KEY=your_api_key_here
```

**Note**: Vite requires variables to be prefixed with `VITE_` to be exposed to the client.

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 3000 already in use | Change port: `npm run dev -- --port 3001` |
| Node modules corruption | Delete `node_modules` and `package-lock.json`, then `npm install` |
| Tailwind styles not loading | Ensure `@import "tailwindcss"` is in `src/index.css` |
| TypeScript errors | Run `npm run lint` to see all issues, then fix |
| Resume link broken | Add `resume.pdf` to `public/` folder |
| Build fails | Check Node version: `node --version` (needs >= 18) |

## 🤝 Contributing

Contributions, suggestions, and feedback are welcome!

**Getting Started**:
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your edits
4. Run linting: `npm run lint`
5. Commit: `git commit -m "chore: describe change"`
6. Push and open a Pull Request

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

## 📄 License

This project is licensed under the **MIT License**. See [LICENSE](./LICENSE) for details.

## 📞 Contact

**Email**: [arinpattnaikofficial@gmail.com](mailto:arinpattnaikofficial@gmail.com)  
**Location**: Bhubaneswar, India [20.27° N, 85.84° E]  
**GitHub**: [@ArinPattnaik](https://github.com/ArinPattnaik)  
**LinkedIn**: [linkedin.com/in/arinpattnaik](https://www.linkedin.com/in/arinpattnaik)

---

**Built with ❤️ using React + Tailwind + Motion**
