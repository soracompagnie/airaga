import { VERSION } from "@airaga/cli/constants/version.js";
import { PackageJson } from "@airaga/cli/helpers/generate-package-json.js";
import { Readme } from "@airaga/cli/helpers/generate-readme.js";
import { Config } from "@airaga/cli/types/config.js";
import { Prompts } from "@airaga/cli/types/prompts.js";
import { v4 } from "uuid";
import { execSync } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * @description - Handles the creation of a new Airaga text game project, including folder structure,
 *                configuration, and initial files. It also initializes a Git repository for version control.
 * @example
 * ```bash
 * bun airaga new my-text-game
 * ```
 * @extends Prompts
 */
export class New extends Prompts {
  private readme!: Readme;
  private packageJson!: PackageJson;

  public async new(gameName: string): Promise<void> {
    this.gameName = gameName;

    // Check if the folder already exists.
    if (gameName !== "." && Boolean(this.fs.existsSync(this.folder))) {
      this.console.error(`❌ Folder "${gameName}" already exists.`);
      this.process.exit(1);
    }

    if (gameName !== ".") {
      this.fs.mkdirSync(this.folder, { recursive: true });
    }

    const ctx = {
      console: this.console,
      dedent: this.dedent,
      fs: this.fs,
      gameName: this.gameName,
      path: this.path,
      process: this.process,
    };

    this.readme = Object.assign(new Readme(), ctx);
    this.packageJson = Object.assign(new PackageJson(), ctx);
    await this.initializeFolder(gameName);
  }

  private async initializeFolder(gameName: string): Promise<void> {
    const init: Config = {
      ifid: v4(),
      name: gameName,
      description: "A new Airaga text game project.",
      version: VERSION,
      author: "Your Name",
    };

    this.fs.mkdirSync(this.path.join(this.folder, "public"), { recursive: true });

    const __dirname = this.path.dirname(fileURLToPath(import.meta.url));
    const faviconPath = this.path.resolve(resolve(__dirname, "../../assets"), "favicon.ico");

    if (this.fs.existsSync(faviconPath) === false) {
      this.console.error(`❌ Default favicon.ico not found at: ${faviconPath}`);
      this.process.exit(1);
    }

    try {
      this.fs.copyFileSync(faviconPath, this.path.join(this.folder, "public", "favicon.ico"));
    } catch (err) {
      this.console.error(`❌ Failed to copy favicon: ${err}`);
      this.process.exit(1);
    }

    this.fs.mkdirSync(this.path.join(this.folder, "src", "menu"), { recursive: true });
    this.fs.mkdirSync(this.path.join(this.folder, "src", "scene"), { recursive: true });

    this.fs.writeFileSync(
      this.path.join(this.folder, "src", "menu", "start.arg"),
      this.dedent(
        `
        <menu>
          This is the main menu of your game.
        </menu>
        `,
      ),
    );

    this.fs.writeFileSync(
      this.path.join(this.folder, "src", "menu", "options.arg"),
      this.dedent(
        `
        <menu>
          This is the options menu of your game.
        </menu>
        `,
      ),
    );

    this.fs.writeFileSync(
      this.path.join(this.folder, "src", "scene", "1.arg"),
      this.dedent(
        `
        <scene>
          This is the starting scene of your game.
        </scene>
      `,
      ),
    );

    this.fs.writeFileSync(
      this.path.join(this.folder, "airaga.config.ts"),
      this.dedent(
        `
        import type { Config } from "airaga";

        export const config: Config = {
          ifid: "${init.ifid}", 
          name: "${init.name}",
          description: "${init.description}",
          version: "${init.version}",
          author: "${init.author}",
        };
      `,
      ),
    );

    this.fs.writeFileSync(this.path.join(this.folder, ".gitignore"), "node_modules\ndist\n.env");

    // Create package.json and README.md
    this.packageJson.write();
    this.readme.write();

    try {
      execSync("git init", { cwd: this.folder, stdio: "ignore" });
      this.console.log("✅ Initialized empty Git repository.");
      this.console.log(`\n🎉 Project "${gameName}" has been successfully created!`);
      this.console.log(`\nNext steps:`);
      this.console.log(`  cd ${gameName}`);
      this.console.log(`  bun install`);
      this.console.log(`  bun airaga dev\n`);
    } catch (err: unknown) {
      this.console.error(`❌ Failed to initialize git: ${(err as Error).message}`);
    }
  }
}