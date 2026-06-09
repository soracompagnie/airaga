<h1 align="center">@airaga/cli</h1>

<p align="center">
  <strong>The official Command Line Interface for the Airaga text game framework.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/npm/v/@airaga/cli?color=blue&label=NPM" alt="NPM Version" />
  <img src="https://img.shields.io/badge/Language-TypeScript-blue" alt="TypeScript" />
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License" />
</p>

This package provides the essential CLI tools for initializing, developing, and building game projects using the Airaga engine.

---

✅ **Written in TypeScript:** Provides a robust and type-safe development experience.  
🧪 **Tested with Vitest:** Ensures high reliability and stable commands.  
📦 **Modular Architecture:** Designed to work seamlessly with `@airaga/parser` and `@airaga/media`.

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or newer)
- **Bun** (Recommended for the best experience and performance)

## 🚀 Installation & Usage

You don't need to install the CLI globally. The recommended way to use Airaga is via `bunx` or `npx`, which ensures you are always using the latest version.

### Starting a New Project

To scaffold a new Airaga text game, run the `new` command:

```bash
bunx @airaga/cli new my-text-game
cd my-text-game
```

### Starting Development Mode

Once inside your project directory, start the local development server:

```bash
bunx @airaga/cli dev
```

## 🛠️ Available Commands

Here is the detailed behavior of each command available in the CLI:

**`new <project-name>`**

Scaffolds a fresh Airaga game project.

- Creates a new directory with the specified project name.
- Generates the default folder structure (e.g., `src/`, `public/`, `assets/`).
- Creates a boilerplate `.arg` file to help you start writing your game immediately.
- Automatically installs the necessary dependencies (`@airaga/parser`, `@airaga/runtime`, etc.).

**`dev`**

Starts the development environment.

- Parses your `.arg` files in real-time.
- Serves your text game on a local preview URL.
- Watches for file changes and automatically reloads the game state.

**`build`**

Bundles your game for production deployment.

- Compiles all .arg scripts into an optimized Abstract Syntax Tree (AST).
- Processes and compresses media files (images, audio) via the internal media pipeline.
- Outputs a minified, deploy-ready folder (usually dist/) that can be hosted on Vercel, Netlify, or any static hosting service.

## 🤝 Contributing

We welcome contributions to the Airaga CLI! If you found a bug or want to suggest a feature, please feel free to open an issue or submit a pull request on our GitHub repository.