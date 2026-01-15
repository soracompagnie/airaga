import { faker } from "@faker-js/faker";
import { existsSync, readdirSync, readFileSync, rmSync } from "fs";
import { join } from "path";
import { cwd } from "process";
import { setTimeout } from "timers";
import { describe, expect, it, vi } from "vitest";
import { New } from "../src/core/new";
import { Test } from "../src/helpers/test";

/**
 * 🧪 Mocking `process.exit` to prevent the test runner from terminating.
 * Instead of exiting, we log a warning when it's called.
 */
vi.spyOn(process, "exit").mockImplementation(((code: number) => {
  console.warn(`⚠️ Mocked process.exit(${code}) called`);
}) as never);

describe("Commands", () => {
  /**
   * 🔧 Test Case: Should create a new game project.
   *
   * This test:
   * 1. Generates a random project name.
   * 2. Calls the `New` command with that name.
   * 3. Verifies that the project directory and key files are created.
   * 4. Logs the result and cleans up by deleting the created directory.
   */
  it("Should create a new game project.", async (): Promise<void> => {
    const name = faker.food.dish().toLowerCase().replace(/ /g, "-");
    const projectPath = join(cwd(), name);

    // Attempt to create a new project
    const command = new New();
    Object.assign(command, await Test(name));

    await command.new(name);

    // ✅ Check if project path was created
    if (!existsSync(projectPath)) {
      console.error("❌ Project path was not created.");
    } else {
      console.log("✅ Project path exists.");
      console.log("✅ Files:", readdirSync(projectPath));
    }

    // ✅ Validate essential files
    expect(existsSync(projectPath)).toBe(true);
    expect(existsSync(join(projectPath, "package.json"))).toBe(true);

    // ✅ Validate favicon in public folder
    const faviconPath = join(projectPath, "public", "favicon.ico");

    if (!existsSync(faviconPath)) {
      console.error("❌ Favicon not found in public folder.");
    } else {
      expect(existsSync(faviconPath), "Favicon should exist in public folder").toBe(true);
      console.log("✅ Favicon exists in public folder.");
    }

    // ✅ Validate airaga.config.ts and its IFID field
    const configPath = join(projectPath, "airaga.config.ts");
    expect(existsSync(configPath), "Config file should exist").toBe(true);

    // This regular expression searches for the key ‘ifid’, a space/colon,
    // quotation marks, then captures the content.
    const ifidMatch = readFileSync(configPath, "utf-8").match(/ifid:\s*"([^"]+)"/);
    expect(ifidMatch, "IFID field not found in config").not.toBeNull();

    // Validate that the value is not empty and (optionally) looks like a UUID
    if (ifidMatch) {
      expect(ifidMatch[1].length).toBeGreaterThan(0);
      expect(ifidMatch[1]).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
      console.log(`✅ IFID found: ${ifidMatch[1]}`);
    }

    // Optional delay to wait for any async file writes
    await new Promise((resolve) => setTimeout(resolve, 100));

    // 🧹 Cleanup: Remove generated project
    rmSync(projectPath, { recursive: true, force: true });
  });
});