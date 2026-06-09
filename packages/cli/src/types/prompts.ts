import type { Dedent } from "dedent";
import type path from "node:path";

/**
 * @description The base commands available in the CLI.
 * @remarks These commands represent the core functionalities of the CLI,
 *          such as building the project, running it in development mode,
 *          generating an IFID, and creating a new project.
 */
export type BaseCommands = "build" | "dev" | "generate" | "new";

/**
 * @description Types for the file system and command functions used in the CLI.
 * @remarks These types define the structure of the file system operations
 *          and the command functions that will be implemented in the Prompts
 *          class. They ensure that the functions adhere to the expected signatures
 *          and return types, facilitating type safety and consistency across the
 *          CLI implementation.
 */
export type FileSystem = typeof import("node:fs");

/**
 * @description Types for the command function to build the project.
 * @remarks This function takes a string argument (representing command-line arguments)
 *          and returns a promise that resolves when the build process is complete.
 *          It is intended to be implemented in the Prompts class to handle the logic
 *          for building the project based on the provided arguments.
 */
export type BuildProject = (_args: string) => Promise<void>;

/**
 * @description Types for the command function to generate an IFID.
 * @remarks This function does not take any arguments and returns a promise that resolves
 *          when the IFID generation is complete. It is intended to be implemented in the
 *          Prompts class to handle the logic for generating an IFID, which is a unique
 *          identifier for interactive fiction games.
 */
export type GenerateIfid = () => Promise<void>;

/**
 * @description Types for the command function to create a new project.
 * @remarks This function takes a string argument (representing command-line arguments)
 *          and returns a promise that resolves when the new project is created. It is
 *          intended to be implemented in the Prompts class to handle the logic for
 *          creating a new project based on the provided arguments.
 */
export type NewProject = (_args: string) => Promise<void>;

/**
 * @description Types for the command function to run the project in development mode.
 * @remarks This function takes a string argument (representing command-line arguments)
 *          and returns a promise that resolves when the development server is running.
 *          It is intended to be implemented in the Prompts class to handle the logic
 *          for running the project in development mode based on the provided arguments.
 */
export type RunProject = (_args: string) => Promise<void>;

/**
 * @abstract
 * @description - The Prompts class serves as a base for CLI commands, providing common properties and
 *                methods for handling file system operations, console output, and process management.
 *                It also includes a context method to assign properties dynamically and a getter for
 *                the project folder path.
 */
export abstract class Prompts {
  /** The console object for outputting messages. */
  public console!: typeof import("node:console");

  /** The dedent function for formatting multi-line strings. */
  public dedent!: Dedent;

  /** The file system object for handling file operations. */
  public fs!: FileSystem;

  /** The unique identifier for the game, if available. */
  public gameName!: string;

  /** The path object for handling file paths. */
  public path!: typeof path;

  /** The process object for managing the Node.js process. */
  public process!: typeof import("node:process");

  /**
   * @description - The context method allows for dynamically assigning properties to the Prompts instance.
   * @param {Partial<Prompts>} ctx - An object containing the properties to be assigned to the instance.
   * @returns {void} - This method does not return anything; it modifies the instance in place.
   */
  public context(ctx: Partial<Prompts>): void {
    Object.assign(this, ctx);
  }

  /**
   * @description - The folder getter computes the path to the project folder based on the current working
   *                directory and the game name.
   * @returns {string} - The computed path to the project folder.
   */
  public get folder(): string {
    return this.gameName === "." ? this.process.cwd() : this.path.join(this.process.cwd(), this.gameName);
  }

  /**
   * @description - Abstract method to build the project.
   * @param {string} _args - The arguments for the build command.
   * @returns {Promise<void>} - A promise that resolves when the build process is complete.
   */
  public build?(_args: string): Promise<void>;

  /**
   * @description - Abstract method to run the project in development mode.
   * @param {string} _args - The arguments for the dev command.
   * @returns {Promise<void>} - A promise that resolves when the development server is running.
   */
  public dev?(_args: string): Promise<void>;

  /**
   * @description - Abstract method to generate an IFID.
   * @returns {Promise<void>} - A promise that resolves when the IFID generation is complete.
   */
  public generate?(): Promise<void>;

  /**
   * @description - Abstract method to create a new project.
   * @param {string} _args - The arguments for the new command.
   * @returns {Promise<void>} - A promise that resolves when the new project is created.
   */
  public new?(_args: string): Promise<void>;
}