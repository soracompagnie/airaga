import type { Dedent } from "dedent";
import type path from "node:path";

export type BaseCommands = "build" | "dev" | "generate" | "new";
export type FileSystem = typeof import("node:fs");
export type BuildProject = (_args: string) => Promise<void>;
export type GenerateIfid = () => Promise<void>;
export type NewProject = (_args: string) => Promise<void>;
export type RunProject = (_args: string) => Promise<void>;

export abstract class Prompts {
  public console!: typeof import("node:console");
  public dedent!: Dedent;
  public fs!: FileSystem;
  public gameName!: string;
  public path!: typeof path;
  public process!: typeof import("node:process");

  public context(ctx: Partial<Prompts>): void {
    Object.assign(this, ctx);
  }

  public get folder(): string {
    return this.gameName === "." ? this.process.cwd() : this.path.join(this.process.cwd(), this.gameName);
  }

  public build?(_args: string): Promise<void>;
  public dev?(_args: string): Promise<void>;
  public generate?(): Promise<void>;
  public new?(_args: string): Promise<void>;
}