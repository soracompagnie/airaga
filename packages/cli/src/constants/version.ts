import pkg from "../../package.json" with { type: "json" };

/**
 * @description The version of the CLI, imported from package.json
 * @type {string}
 * @constant
 */
export const VERSION: string = pkg.version;