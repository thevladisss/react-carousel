# React Carousel

A lightweight image carousel built from scratch with React 19, TypeScript, and Vite. No third-party carousel libraries — all transition logic and navigation are implemented manually using CSS animations and React state.

## Features

- Smooth sliding transitions (previous/next) with CSS-driven animations
- Circular navigation — wraps around from the last slide to the first and vice versa
- Slide counter displaying the current position
- Accessible markup with `aria-live` and `role="group"`

## Tech Stack

- React 19 + TypeScript
- Vite 7
- React Compiler (babel plugin)
- ESLint

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |
