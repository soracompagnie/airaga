<h1 align="center">Airaga</h1>

<p align="center">
  <em>An opinionated text game framework written in TypeScript.</em><br/>
  <strong>Build immersive, interactive fiction with ease.</strong>
</p>

## ✨ Features

- 🔧 Scene-based structure for organized storytelling
- ⚡ Built with TypeScript for type safety and developer experience
- 🧱 Opinionated architecture to reduce boilerplate
- 🛠️ CLI to scaffold new games quickly
- 🧪 Built-in test support with Vitest

## 🚀 Getting Started

### 1. Create a New Project

```bash
npx airaga new my-text-game
cd my-text-game
npm install
```

### 2. Start Writing

Edit scenes inside the `src/scene/` folder. Your entry point is `src\menu\start.arg`.

### 3. Run the Game

```bash
npm run start
```

> Coming soon: a CLI runner for launching games directly!

## 📦 Project Structure

```bash
my-text-game/
├── public/           # Static assets
├── src/
│   ├── menu/         # Menu options
│   ├── scene/        # Game scenes
├── .gitignore
├── airaga.config.ts
├── package.json
└── README.md
```

## 🧪 Tech Stack

- [Bun](https://bun.sh/)
- [ESLint](https://eslint.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vitest](https://vitest.dev/)

## 📄 License

[MIT License](https://github.com/a6iyyu/airaga/blob/main/LICENSE).

Created with ❤️ by Rafi Abiyyu Airlangga.

## 📢 Acknowledgements

Inspired by classic text-based games and modern tooling. Thanks to all open-source contributors!