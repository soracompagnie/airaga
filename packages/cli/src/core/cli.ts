import { intro, outro, text, select, isCancel, cancel } from "@clack/prompts";
import { argv } from "node:process";
import { New } from "@airaga/cli/core/new";
import * as fs from "node:fs";
import * as path from "node:path";
import dedent from "dedent";

export class Cli {
  private args = argv.slice(2);
  private command = this.args[0];
  private argument = this.args[1];

  private readonly validCommands = ["build", "dev", "generate", "new"];
  private newProject: New;

  constructor() {
    this.newProject = new New();
    this.newProject.context({
      console: console,
      process: process,
      fs: fs,
      path: path,
      dedent: dedent,
    });
  }

  public async init(): Promise<void> {
    console.clear();
    intro(` 🔥 Welcome to Airaga! `);

    if (!this.command) {
      const selectedCommand = await select({
        message: "What do you want to do?",
        options: [
          { value: "new", label: "Create new project" },
          { value: "dev", label: "Start development server" },
          { value: "build", label: "Build project" },
        ],
      });

      if (isCancel(selectedCommand)) {
        cancel("Operation cancelled.");
        process.exit(0);
      }

      this.command = selectedCommand as string;
    }

    if (!this.validCommands.includes(this.command)) {
      cancel(`❌ Unknown command "${this.command}". Supported: ${this.validCommands.join(", ")}`);
      process.exit(1);
    }

    switch (this.command) {
      case "new":
        await this.createNewProject();
        break;
      case "dev":
        console.log("🚧 Dev mode not implemented yet.");
        break;
    }
  }

  private async createNewProject(): Promise<void> {
    let name = this.argument;

    if (!name) {
      const response = await text({
        message: "What is the name of your game?",
        placeholder: "my-awesome-rpg",
        validate(value) {
          if (value.length === 0) return `Name is required!`;
        },
      });

      if (isCancel(response)) {
        cancel("Operation cancelled.");
        process.exit(0);
      }

      name = response;
    }

    const formattedName = name.toLowerCase().replace(/\s+/g, "-");
    await this.newProject.new(formattedName);

    outro(`✅ Project "${formattedName}" created successfully!`);
  }
}