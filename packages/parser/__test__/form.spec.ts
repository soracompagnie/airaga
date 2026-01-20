import { describe, expect, it } from "vitest";
import { Parser } from "../src/core/parser";
import type { AiragaNode } from "../src/types/ast";

describe("Airaga Parsing Form", () => {
  it("Should parse input element with label", () => {
    const input = `<input name="heroName" placeholder="Ex: Arthur">Enter your Hero's name:</input>`;
    const parsed = Parser.parse(input);

    expect(parsed[0]).toEqual<AiragaNode>({
      type: "input",
      content: "Enter your Hero's name:",
      props: { name: "heroName", placeholder: "Ex: Arthur" },
      children: undefined,
    });
  });

  it("Should parse select element with nested options", () => {
    const input = `
      <select name="heroClass">
        <option value="warrior">Warrior</option>
        <option value="mage">Mage</option>
      </select>
    `;

    const parsed = Parser.parse(input);

    expect(parsed[0].type).toBe("select");
    expect(parsed[0].props).toEqual({ name: "heroClass" });

    expect(parsed[0].children).toHaveLength(2);
    expect(parsed[0].children?.[0]).toEqual<AiragaNode>({
      type: "option",
      content: "Warrior",
      props: { value: "warrior" },
      children: undefined,
    });
  });

  it("Should parse radio element with nested options", () => {
    const input = `
      <radio name="gender">
        <option value="m">Male</option>
        <option value="f">Female</option>
      </radio>
    `;

    const parsed = Parser.parse(input);

    expect(parsed[0].type).toBe("radio");
    expect(parsed[0].props).toEqual<AiragaNode["props"]>({ name: "gender" });
    expect(parsed[0].children).toHaveLength(2);
    expect(parsed[0].children?.[1].content).toBe("Female");
  });
});