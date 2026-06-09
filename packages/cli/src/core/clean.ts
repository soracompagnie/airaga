import { Prompts } from "@airaga/cli/types/prompts.js";

export class Clean extends Prompts {
  public async clean(): Promise<void> {
    const targetPath = this.path.join(this.process.cwd(), ".airaga");

    try {
      if (this.fs.existsSync(targetPath)) {
        this.fs.rmSync(targetPath, { recursive: true, force: true });
        this.console.log("✅ Cleaned the .airaga directory successfully!");
      } else {
        this.console.log("ℹ️ No .airaga directory found to clean.");
      }
    } catch (error) {
      this.console.error(`❌ Failed to clean .airaga directory: ${(error as Error).message}`);
      this.process.exit(1);
    }
  }
}