import { Prompts } from "@airaga/cli/types/prompts.js";

/**
 * @description - The `Dev` class handles the development server functionality for the Airaga game engine.
 *                It reads the `start.arg` file to determine the entry point for the development server.
 *                If the file is missing or empty, it logs an error message and exits the process.
 * @example
 * ```bash
 * bun airaga dev
 * ```
 * @extends Prompts
 */
export class Dev extends Prompts {
  public async dev(): Promise<void> {
    const startPath = this.path.join(this.process.cwd(), "src", "menu", "start.arg");

    if (!this.fs.existsSync(startPath)) {
      this.console.error("❌ Fatal Error: `start.arg` file is missing in the `src` directory.");
      this.process.exit(1);
    }

    try {
      const startContent = this.fs.readFileSync(startPath, "utf-8").trim();

      if (!startContent || startContent.length === 0) {
        this.console.error("❌ `start.arg` file is empty. Please specify the starting scene.");
        this.process.exit(1);
      }

      if (!startContent.endsWith(".arg")) {
        this.console.error(`❌ Invalid entry point in \`start.arg\`. Expected a .arg file, got: "${startContent}"`);
        this.process.exit(1);
      }

      this.console.log(`✅ Starting development server with entry point: ${startContent}`);

      // TODO: Implement the logic to start the development server using the specified entry point.
    } catch (error) {
      this.console.error(`❌ Failed to read entry point: ${(error as Error).message}`);
      this.process.exit(1);
    }
  }
}