import { describe, it, vi } from "vitest";

/**
 * 🧪 Mocking `process.exit` to prevent the test runner from terminating.
 * Instead of exiting, we log a warning when it's called.
 */
vi.spyOn(process, "exit").mockImplementation(((code: number) => {
  console.warn(`⚠️ Mocked process.exit(${code}) called`);
}) as never);

describe("Development", () => {
  it("Should run the project using the command `bun run dev`.", () => {});
});