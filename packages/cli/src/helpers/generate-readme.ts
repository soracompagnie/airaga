import { version } from "@airaga/cli/constants/version";
import { Prompts } from "@airaga/cli/types/prompts";

export class Readme extends Prompts {
  public write(): void {
    return this.fs.writeFileSync(this.path.join(this.folder, "README.md"), this.dedent(
      `
        # Airaga New Game Project

        Welcome to Airaga, a text-based adventure game built using [Airaga](https://github.com/gatranova/airaga) engine!

        ## ✨ Overview

        - **IFID**: <ifid>
        - **Description**: A new Airaga text game project.
        - **Version**: ${version}
        - **Author**: [Your Name Here]

        ## 🏗 Project Structure

        - \`public\`
          - \`favicon.ico\`
        - \`src\`
          - \`items\`
            - \`character.arg\`
          - \`scene\`
            - \`1.arg\`
          - \`start.arg\`
        - \`.gitignore\`
        - \`airaga.config.ts\`
        - \`package.json\`
        - \`README.md\`

        ## 🚀 Getting Started

        1. Create a new game:
        \`\`\`bash
        bun airaga new game
        \`\`\`
        2. Change directory
        \`\`\`bash
        cd game
        \`\`\`
        3. Install dependencies (if needed):
        \`\`\`bash
        bun install
        \`\`\`
        4. Run the game:
        \`\`\`bash
        airaga start
        \`\`\`

        ## 📖 Writing Scenes

        Scenes are written using HTML-like tags:
        \`\`\`html
        <scene>
          This is the opening of your story.
        </scene>
        \`\`\`

        Each <scene> represents a single page or node in your game's storyline.

        ## 🔧 Configuration (airaga.config.ts)

        \`\`\`ts
        import type { Config } from "airaga";
        import { Roboto } from "@airaga/fonts";

        export const config: Config = {
          ifid: "<ifid>",
          name: "New Text Game",
          description: "A new Airaga text game project.",
          version: "${version}",
          author: "",
          fonts: () => Roboto({
            subsets: ["latin"],
            weight: ["400", "500", "600", "700"],
          }),
        };
        \`\`\`

        ## 📜 License
        
        This project is licensed under the [MIT License](https://github.com/gatranova/airaga/blob/main/LICENSE).
      `,
    ));
  }
}