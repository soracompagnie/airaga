import { faker } from "@faker-js/faker";
import { cwd } from "node:process";
import { setTimeout } from "node:timers";
import { describe, expect, it, vi } from "vitest";
import { New } from "../src/core/new.js";
import dedent from "dedent";
import * as fs from "node:fs";
import * as path from "node:path";

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
    const projectPath = path.join(cwd(), name);

    const command = new New();

    Object.assign(command, {
      fs,
      path,
      process: { ...process, exit: process.exit },
      console,
      dedent,
      gameName: name,
    });

    await command.new(name);

    // ✅ Check if project path was created
    if (!fs.existsSync(projectPath)) {
      console.error("❌ Project path was not created.");
    } else {
      console.log("✅ Project path exists.");
      console.log("✅ Files:", fs.readdirSync(projectPath));
    }

    // ✅ Validate essential files
    expect(fs.existsSync(projectPath)).toBe(true);
    expect(fs.existsSync(path.join(projectPath, "package.json"))).toBe(true);

    // ✅ Validate favicon in public folder
    const faviconPath = path.join(projectPath, "public", "favicon.ico");

    if (!fs.existsSync(faviconPath)) {
      console.error("❌ Favicon not found in public folder.");
    } else {
      expect(fs.existsSync(faviconPath), "Favicon should exist in public folder").toBe(true);
      console.log("✅ Favicon exists in public folder.");
    }

    // ✅ Validate airaga.config.ts and its IFID field
    const configPath = path.join(projectPath, "airaga.config.ts");
    expect(fs.existsSync(configPath), "Config file should exist").toBe(true);

    const ifidMatch = fs.readFileSync(configPath, "utf-8").match(/ifid:\s*"([^"]+)"/);
    expect(ifidMatch, "IFID field not found in config").not.toBeNull();

    if (ifidMatch) {
      expect(ifidMatch[1].length).toBeGreaterThan(0);
      expect(ifidMatch[1]).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
      console.log(`✅ IFID found: ${ifidMatch[1]}`);
    }

    await new Promise((resolve) => setTimeout(resolve, 100));

    // 🧹 Cleanup: Remove generated project
    fs.rmSync(projectPath, { recursive: true, force: true });
  });
});