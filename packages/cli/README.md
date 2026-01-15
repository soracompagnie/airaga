<h1 align="center">Command Line Interface</h1>

This package contains the CLI (Command Line Interface) for the Airaga text game framework.

It provides commands for initializing new game projects and interacting with the engine from the terminal.

---

✅ Written in TypeScript  
🧪 Tested with Vitest  
📦 Designed to be modular and extendable

## Available Commands

- `build` – Bundle the game for production (export as runnable or publishable files)
- `dev` – Start the development mode (e.g., preview or run the game in dev environment)
- `new <project-name>` – Create a new Airaga game project from template

Each command is designed to be composable, scriptable, and consistent across environments.

## Example Usage

```bash
bunx airaga new my-text-game
cd my-text-game
bunx airaga dev
```