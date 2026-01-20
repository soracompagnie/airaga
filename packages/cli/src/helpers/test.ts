import dedent from "dedent";

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