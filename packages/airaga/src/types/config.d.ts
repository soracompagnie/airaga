type Theme = "dark" | "light" | "auto" | "retro" | "cyberpunk" | "nature";
/**
 * @description Defines the structure of the configuration object used in the application.
 * @interface Config
 */
export interface Config {
  /**
   * The unique identifier for the game. If two or more people give the same name to a game,
   * the IFID (Interactive Fiction Identifier) is used to distinguish between them.
   */
  ifid: string | null;
  /** The name of the game. */
  name: string;
  /** A brief description of the game. */
  description: string;
  /** The version of the game. */
  version: string;
  /** The author(s) of the game. */
  author: string | string[];
  /** Indicates whether autosave is enabled for the game. */
  autosave?: boolean;
  /** A string specifying the fonts used in the game. */
  fonts?: string;
  /** Indicates whether a theme is applied to the game. */
  theme?: Theme;
}
export {};
//# sourceMappingURL=config.d.ts.map
