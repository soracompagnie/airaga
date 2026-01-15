import { Prompts } from "@airaga/cli/types/prompts";

export class Dev extends Prompts {
  public async dev(): Promise<void> {
    const startPath = this.path.join(this.process.cwd(), "src", "start.arg");
    const startFile = this.fs.readFileSync(startPath, "utf-8").trim();

    if (startFile.length == null) {
      this.console.error("❌ start.arg file is missing or empty.");
      this.process.exit(1);
    }
  }
}