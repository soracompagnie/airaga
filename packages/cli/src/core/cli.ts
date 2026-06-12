import { Build } from "@airaga/cli/core/build.js";
import { Dev } from "@airaga/cli/core/dev.js";
import { New } from "@airaga/cli/core/new.js";
import { Prompts } from "@airaga/cli/types/prompts.js";
import { cancel, intro, isCancel, outro, select, text } from "@clack/prompts";
import { faker } from "@faker-js/faker";
import { argv } from "node:process";
import * as fs from "node:fs";
import * as path from "node:path";
import dedent from "dedent";

/**
 * @description Main CLI class that handles user interactions and commands for the Airaga game engine.
 *              It supports commands like "new" for creating a new project and "dev" for starting the
 *              development server.
 * @example
 * ```bash
 * # Create a new project
 * bunx airaga new my-awesome-game
 *
 * # Start development server
 * bunx airaga dev
 * ```
 */
export class Cli extends Prompts {
  private args = argv.slice(2);
  private command = this.args[0];
  private argument = this.args[1];

  private readonly validCommands = ["build", "dev", "generate", "new"];
  private buildProject: Build;
  private devProject: Dev;
  private newProject: New;

  constructor() {
    super();
    this.buildProject = new Build();
    this.devProject = new Dev();
    this.newProject = new New();

    this.buildProject.context({
      console: console,
      process: process,
      fs: fs,
      path: path,
      dedent: dedent,
    });

    this.devProject.context({
      console: console,
      process: process,
      fs: fs,
      path: path,
      dedent: dedent,
    });

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

    if (!this.command) {
      intro(` 🔥 Welcome to Airaga! `);
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
      cancel(
        `❌ Unknown command "${this.command}". Supported: ${this.validCommands.join(", ")}`,
      );
      process.exit(1);
    }

    switch (this.command) {
      case "build":
        await this.buildProject.build();
        break;
      case "dev":
        await this.devProject.dev();
        break;
      case "new":
        await this.new();
        break;
      default:
        cancel(`❌ Command "${this.command}" is not implemented yet.`);
        process.exit(1);
    }
  }

  /**
   * @description Handles the creation of a new Airaga project. It prompts the user for a project name,
   *              generates a default name if none is provided, and then creates the project using the New class.
   * @returns {Promise<void>} A promise that resolves when the project creation process is complete.
   */
  public async new(): Promise<void> {
    const defaultName = faker.word
      .words({ count: { min: 3, max: 7 } })
      .toLowerCase()
      .replace(/\s+/g, "-");
    let name = this.argument;

    if (!name) {
      const response = await text({
        message: "What is the name of your game?",
        placeholder: defaultName,
        defaultValue: defaultName,
      });

      if (isCancel(response)) {
        cancel("Operation cancelled.");
        process.exit(0);
      }

      const safeResponse = (response as string | undefined) || "";
      name =
        safeResponse.trim() === ""
          ? defaultName
          : safeResponse.trim().toLowerCase().replace(/\s+/g, "-");
    }

    await this.newProject.new(name);
    outro(`✅ Project "${name}" created successfully!`);
  }
}
