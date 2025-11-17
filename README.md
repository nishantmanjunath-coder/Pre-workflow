# Yellow.ai Agent Development Platform UI

A modern, responsive web interface for AI agent development, built with React, TypeScript, and Tailwind CSS.

## Features

- **Header Navigation**: Main navigation tabs (Super agent, Agents, Global components) with user controls
- **Sidebar Navigation**: Organized sections for BUILD, DATA & KNOWLEDGE, ANALYTICS, and ENGAGE
- **Agent Configuration**: Interface for configuring agent start triggers and conversation prompts
- **Modern UI**: Clean, professional design with purple accent colors matching the Yellow.ai brand

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment & Sharing

### Option 1: Deploy to Vercel (Recommended - Easiest)

1. **Install Vercel CLI** (if not already installed):
```bash
npm install -g vercel
```

2. **Deploy**:
```bash
vercel
```

3. Follow the prompts and your app will be live with a shareable link!

**Or use the web interface:**
- Go to [vercel.com](https://vercel.com)
- Sign up/login with GitHub
- Click "New Project"
- Import your repository
- Vercel will auto-detect Vite and deploy automatically

### Option 2: Deploy to Netlify

1. **Install Netlify CLI**:
```bash
npm install -g netlify-cli
```

2. **Build your project**:
```bash
npm run build
```

3. **Deploy**:
```bash
netlify deploy --prod --dir=dist
```

**Or use the web interface:**
- Go to [netlify.com](https://netlify.com)
- Drag and drop your `dist` folder after running `npm run build`

### Option 3: Deploy to GitHub Pages

1. **Install gh-pages**:
```bash
npm install --save-dev gh-pages
```

2. **Add to package.json scripts**:
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

3. **Deploy**:
```bash
npm run deploy
```

4. Enable GitHub Pages in your repository settings and set source to `gh-pages` branch

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── Header.tsx          # Main header with navigation
│   │   ├── Sidebar.tsx         # Left sidebar navigation
│   │   └── AgentConfiguration.tsx  # Agent configuration interface
│   ├── App.tsx                 # Main app component
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles with Tailwind
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

## Technologies Used

- **React 18**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Fast build tool and dev server

## Customization

The UI uses a purple color scheme that can be customized in `tailwind.config.js`. The main components are modular and can be easily extended or modified.

