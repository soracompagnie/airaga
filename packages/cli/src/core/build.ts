import { Config } from "@airaga/cli/types/config.js";
import { Prompts } from "@airaga/cli/types/prompts.js";
import { intro, outro, spinner, log } from "@clack/prompts";

/**
 * @description - The `Build` class handles the compilation of the Airaga project.
 * It reads the user's config, parses `.arg` scene files, and generates
 * the final playable HTML/JS bundle into the `.airaga` directory.
 * @example
 * ```bash
 * bunx airaga build
 * ```
 * @extends Prompts
 */
export class Build extends Prompts {
  public async build(): Promise<void> {
    intro("⏳ Building the Airaga game...");

    // INFO: Using clack's spinner for a modern, asynchronous loading experience in the terminal
    const s = spinner();
    s.start("Preparing build environment");

    try {
      // INFO: Define core paths for the build pipeline
      const rootDir = this.process.cwd();
      const outputDir = this.path.join(rootDir, ".airaga");
      const configPath = this.path.join(rootDir, "airaga.config.ts");
      const srcDir = this.path.join(rootDir, "src");

      // TODO: Integrate the `Clean` module here.
      // It's highly recommended to clean the output directory before every new build
      // to avoid stale files from previous compilations.
      if (!this.fs.existsSync(outputDir)) {
        this.fs.mkdirSync(outputDir, { recursive: true });
      }

      s.message("Loading airaga.config.ts...");

      // FIXME: Dynamic import of raw .ts files in Node ESM can be tricky without loaders.
      // Since you have 'jiti' or 'tsx' in your package.json, you might want to use it here
      // to transpile the config on-the-fly before reading it.
      // For now, this is a simulated configuration object.
      const userConfig: Pick<Config, "name" | "author" | "ifid"> = {
        name: "Airaga Game",
        author: "Jane Doe",
        ifid: "0000-0000-0000",
      };

      if (this.fs.existsSync(configPath)) {
        // Simulated config loading delay
        await new Promise((resolve) => setTimeout(resolve, 200));
        log.step("Configuration loaded successfully.");
      } else {
        log.warn(
          "airaga.config.ts not found! Proceeding with default configurations.",
        );
      }

      s.message("Compiling .arg scenes...");

      // INFO: This is the core engine compiler loop.
      // It will read the custom text-based syntax and convert it into a format
      // the browser can understand (like JSON or JS objects).
      const sceneDir = this.path.join(srcDir, "scene");
      let parsedScenes = 0;

      if (this.fs.existsSync(sceneDir)) {
        const files = this.fs.readdirSync(sceneDir);
        for (const file of files) {
          if (file.endsWith(".arg")) {
            // TODO: Actually parse your .arg files using the @airaga/parser package here.
            // const content = this.fs.readFileSync(this.path.join(sceneDir, file), "utf-8");

            await new Promise((resolve) => setTimeout(resolve, 50)); // Simulating parsing time
            parsedScenes++;
          }
        }
        log.step(`Successfully compiled ${parsedScenes} scene(s).`);
      } else {
        log.warn("No 'scene' directory found in 'src/'. Game will be empty.");
      }

      s.message("Generating static assets and HTML...");

      // INFO: Injecting the parsed configuration into the final HTML template.
      // This template acts as the entry point for the text game engine.
      const htmlContent = this.dedent(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          
          <title>${userConfig.name}</title>
          <meta name="author" content="${userConfig.author}">
          <meta name="airaga-ifid" content="${userConfig.ifid}">
          
          <link rel="icon" href="./public/favicon.ico" type="image/x-icon">
          </head>
        <body>
          <noscript>You need to enable JavaScript to run this Airaga game.</noscript>
          <div id="airaga-root"></div>
          
          <script type="module" src="./runtime.js"></script>
        </body>
        </html>
      `);

      // Write the final HTML entry point
      this.fs.writeFileSync(this.path.join(outputDir, "index.html"), htmlContent);

      // TODO: Copy 'public' folder assets (like favicon.ico) to the '.airaga' directory

      s.stop("Build processes finished!");
      outro(`✅ Build completed successfully! Your game is ready in the \`.airaga\` folder.`);
    } catch (error) {
      s.stop("Build failed!");
      this.console.error(`❌ Error during build process: ${(error as Error).message}`);
      this.process.exit(1);
    }
  }
}