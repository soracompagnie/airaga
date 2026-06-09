import dedent from "dedent";

/**
 * @description Provides a testing environment with commonly used modules and utilities.
 * @param {string} gameName - The name of the game being tested.
 * @returns {Promise<Record<string, unknown>>} An object containing the testing environment.
 */
export async function Test(gameName: string): Promise<Record<string, unknown>> {
  return {
    fs: await import("fs"),
    path: await import("path"),
    process: { ...process, exit: process.exit },
    console,
    dedent,
    gameName,
  };
}