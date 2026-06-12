import { Build } from "@airaga/cli/core/build.js";
import { Prompts } from "@airaga/cli/types/prompts.js";
import { createServer } from "vite";

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
    const builder = new Build();

    builder.context({
      console: this.console,
      process: this.process,
      fs: this.fs,
      path: this.path,
      dedent: this.dedent,
    });

    await builder.build();

    const server = await createServer({
      configFile: false,
      root: this.path.join(this.process.cwd(), ".airaga"),
      server: { port: 3227, open: true },
      plugins: [
        {
          name: "airaga",
          transformIndexHtml(html): string {
            return html.replace(
              "</head>",
              `
            <script type="module">
              import.meta.hot?.on('bundle-update', (data) => window.location.reload());
            </script>
            </head>
          `,
            );
          },
        },
      ],
    });

    await server.listen();
    server.printUrls();

    this.fs.watch(
      this.path.join(this.process.cwd(), "src"),
      { recursive: true },
      async (_, filename) => {
        if (filename?.endsWith(".arg")) {
          console.log(`\n🔄 ${filename} berubah. Rebuilding...`);
          await builder.build().catch(console.error);
          server.ws.send({ type: "custom", event: "bundle-update" });
        }
      },
    );
  }
}
