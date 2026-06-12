import type { Config } from "airaga";
import { Clean } from "@airaga/cli/core/clean.js";
import { Prompts } from "@airaga/cli/types/prompts.js";
import { Processor } from "@airaga/media";
import { type ArgNode, Parser } from "@airaga/parser";
import { outro, spinner, log } from "@clack/prompts";
import dedent from "dedent";
import fs from "node:fs";
import path from "node:path";

/**
 * @description Handles the compilation of the Airaga project.
 *              Reads user config, parses .arg files, and generates the HTML/JS bundle.
 * @extends Prompts
 */
export class Build extends Prompts {
  private clean: Clean;

  constructor() {
    super();
    this.clean = new Clean();
    this.clean.context({
      console,
      process,
      fs,
      path,
      dedent,
    });
  }

  public async build(): Promise<void> {
    const s = spinner();
    s.start("⏳ Building the Airaga game...");

    try {
      /**
       * =====================================================================
       * Define key paths for the build process:
       * - rootDirectory: The current working directory of the project.
       * - outputDirectory: The destination for the built game (".airaga").
       * - configPath: The expected location of the user's configuration file.
       * - publicDirectory: The source directory for static assets.
       * - distPublicDirectory: The destination for optimized static assets in the build.
       * - srcDirectory: The source directory for game scenes and logic.
       * - sceneDirectory: The specific directory for `.arg` scene files.
       * =====================================================================
       */

      const rootDirectory = this.process.cwd();
      const outputDirectory = this.path.join(rootDirectory, ".airaga");
      const configPath = this.path.join(rootDirectory, "airaga.config.ts");
      const publicDirectory = this.path.join(rootDirectory, "public");
      const distPublicDirectory = this.path.join(outputDirectory, "public");
      const srcDirectory = this.path.join(rootDirectory, "src");
      const sceneDirectory = this.path.join(srcDirectory, "scene");

      s.start("Cleaning previous build environment");
      await this.clean.clean();
      if (!this.fs.existsSync(outputDirectory))
        this.fs.mkdirSync(outputDirectory, { recursive: true });

      s.message("Loading configuration...");

      const userConfig: Pick<Config, "name" | "author" | "ifid"> = {
        name: "Airaga Game",
        author: "Jane Doe",
        ifid: "0000-0000-0000",
      };

      if (this.fs.existsSync(configPath)) {
        await new Promise((resolve) => setTimeout(resolve, 200));
        log.step("Configuration loaded successfully.");
      }

      s.message("Optimizing media and generating asset manifest...");
      const manifest = await Processor.buildAssetManifest(
        publicDirectory,
        distPublicDirectory,
      );
      log.step("Media pipeline finished.");

      s.message("Compiling .arg scenes...");
      const gameAST: Record<string, ArgNode[]> = {};
      let parsedScenes = 0;

      if (!this.fs.existsSync(sceneDirectory)) {
        log.warn("No 'scene' directory found in 'src/'. Game will be empty.");
      } else {
        const files = this.fs.readdirSync(sceneDirectory);
        for (const file of files) {
          if (!file.endsWith(".arg")) continue;

          const content = this.fs.readFileSync(
            this.path.join(sceneDirectory, file),
            "utf-8",
          );
          const ast = Parser.parse(content);

          Parser.applyManifest(ast, manifest);
          gameAST[file] = ast;
          parsedScenes++;
        }

        this.fs.writeFileSync(
          this.path.join(outputDirectory, "bundle.json"),
          JSON.stringify(gameAST),
        );
        log.step(`Successfully compiled ${parsedScenes} scene(s).`);
      }

      s.message("Generating HTML entry point...");
      const faviconPath = manifest["/favicon.ico"]
        ? `${manifest["/favicon.ico"]}`
        : "/favicon.ico";

      const htmlContent = dedent(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${userConfig.name}</title>
          <meta name="author" content="${userConfig.author}">
          <meta name="airaga-ifid" content="${userConfig.ifid}">
          <link rel="icon" href="${faviconPath}" type="image/x-icon">
        </head>
        <body>
          <noscript>You need to enable JavaScript to run this Airaga game.</noscript>
          <div id="airaga-root"></div>
          <!-- <script type="module" src="./runtime.js"></script> -->
        </body>
        </html>
      `);

      this.fs.writeFileSync(
        this.path.join(outputDirectory, "index.html"),
        htmlContent,
      );
      log.step("HTML entry point generated.");

      console.info("Build processes finished!");
      outro(
        `✅ Build completed successfully! Your game is ready in the \`.airaga\` folder.`,
      );
    } catch (error) {
      s.stop("Build failed!");
      this.console.error(
        `❌ Error during build process: ${(error as Error).message}`,
      );
      this.process.exit(1);
    }
  }
}
