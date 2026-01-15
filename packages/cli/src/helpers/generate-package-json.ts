import { version } from "@airaga/cli/constants/version";
import { Prompts } from "@airaga/cli/types/prompts";

export class PackageJson extends Prompts {
  public write(): boolean {
    const file = this.path.join(this.folder, "package.json");
    this.fs.mkdirSync(this.folder, { recursive: true });
    const hasPackageJson = this.fs.existsSync(file);

    if (!hasPackageJson) {
      const content = {
        name: this.gameName === "." ? "airaga-game" : this.gameName,
        version: `${version}`,
        main: "src/start.arg",
        type: "module",
        scripts: {
          build: "airaga build",
          dev: "airaga dev",
        },
        devDependencies: {
          airaga: `^${version}`,
          "@types/node": "latest",
          typescript: "latest",
        },
        license: "MIT",
        types: "airaga.config.ts",
      };

      this.fs.writeFileSync(file, JSON.stringify(content, null, 2));
    }

    return hasPackageJson;
  }
}