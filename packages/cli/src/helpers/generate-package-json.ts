import { VERSION } from "@airaga/cli/constants/version.js";
import { Prompts } from "@airaga/cli/types/prompts.js";

/**
 * @description Generates a package.json file for the Airaga game project. If a package.json file already exists, it will not overwrite it and will return true. If it creates a new package.json file, it will return false.
 * @extends Prompts
 * @returns {boolean}
 */
export class PackageJson extends Prompts {
  public write(): boolean {
    const file = this.path.join(this.folder, "package.json");
    this.fs.mkdirSync(this.folder, { recursive: true });
    const hasPackageJson = this.fs.existsSync(file);

    if (!hasPackageJson) {
      const content = {
        name: this.gameName === "." ? "airaga-game" : this.gameName,
        version: `${VERSION}`,
        type: "module",
        scripts: {
          build: "airaga build",
          dev: "airaga dev",
        },
        devDependencies: {
          "@airaga/cli": `^${VERSION}`,
          "@types/node": "latest",
          "airaga": `^${VERSION}`,
          "typescript": "latest",
        },
        license: "MIT",
        types: "airaga.config.ts",
      };

      this.fs.writeFileSync(file, JSON.stringify(content, null, 2));
    }

    return hasPackageJson;
  }
}