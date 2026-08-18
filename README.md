# HackerRing 26' Landing Page

A highly interactive, terminal/hacker-themed landing page for HackerRing 26'. Built with React, Vite, and Tailwind CSS, this landing page features a bold, monochrome brutalist aesthetic, complete with dynamic animations, CRT scanline effects, and live audio waveform visualizations.

## 🚀 Features

- **Terminal/Hacker Aesthetic**: A cohesive, professional dark mode design with monospace typography and strict grid alignments.
- **Dynamic Animations**: Includes typewriter effects, staggered decode-in reveal effects, and a binary matrix-style drift background.
- **Audio Waveform Visualizations**: Continuous, live-bouncing audio waveform animations with peak glows to emphasize the Voice AI theme.
- **Interactive UI**: Features cursor-reactive dot patterns, hover state bracket indicators, and SVG border tracing animations on UI cards.
- **CRT Flicker Overlays**: Subtle scanline CRT raster textures create a retro, immersive terminal experience.
- **Fully Responsive**: Optimized for desktop, tablet, and mobile, with a dedicated sticky quick-register action bar for mobile users.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Motion](https://motion.dev/) (Framer Motion)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Extra Effects**: `canvas-confetti`

## 📦 Getting Started

### Prerequisites

Ensure you have Node.js and npm (or bun/yarn/pnpm) installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/pratyushjaiswal0806-dot/voice-ai-hack.git
   cd voice-ai-hack
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   bun install
   ```

### Running Locally

Start the Vite development server:

```bash
npm run dev
# or
bun run dev
```

The app will be running at `http://localhost:3000` (or `http://0.0.0.0:3000`).

### Building for Production

To create a production build:

```bash
npm run build
# or
bun run build
```

You can preview the built site locally using:

```bash
npm run preview
# or
bun run preview
```

## 📂 Project Structure

- `src/App.tsx`: The main single-page application flow, containing all the sections.
- `src/components/`: Contains all modular UI sections like `HeroSection`, `TracksSection`, `PrizeSection`, and specialized components like `WaveformVisualizer`, `GlitchText`, and `CountUpNumber`.
- `src/components/ui/`: Contains reusable UI building blocks like the interactive `DotPattern`.
- `src/index.css`: Global styles and custom CSS animations (like CRT scanlines).

## 📄 License

This project is licensed under the MIT License.
