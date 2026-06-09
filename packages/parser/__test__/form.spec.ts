import { describe, expect, it } from "vitest";
import { Parser } from "../src/core/parser";
import type { ArgNode } from "../src/types/ast";

describe("Airaga Parsing Form", () => {
  it("Should parse input element (as Void Element)", () => {
    const input = `<input name="heroName" placeholder="Ex: Arthur" />`;
    const parsed = Parser.parse(input);

    expect(parsed[0]).toEqual<ArgNode>({
      type: "input",
      content: "",
      props: { name: "heroName", placeholder: "Ex: Arthur" },
      children: [],
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
    expect(parsed[0].props).toEqual<ArgNode["props"]>({ name: "heroClass" });
    expect(parsed[0].children).toHaveLength(2);

    expect(parsed[0].children?.[0]).toEqual<ArgNode>({
      type: "option",
      content: "Warrior",
      props: { value: "warrior" },
      children: [],
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
    expect(parsed[0].props).toEqual<ArgNode["props"]>({ name: "gender" });
    expect(parsed[0].children).toHaveLength(2);
    expect(parsed[0].children?.[1].content).toBe("Female");
  });
});