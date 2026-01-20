import { describe, expect, it } from "vitest";
import { Parser } from "../src/core/parser";
import type { AiragaNodeProps } from "../src/types/ast";

describe("Airaga Parsing Button", () => {
  it("Should parse button with action props", () => {
    const input = `<button action="next_scene" class="primary">Lanjut</button>`;
    const result = Parser.parse(input);

    expect(result[0]).toEqual({
      type: "button",
      content: "Lanjut",
      props: {
        action: "next_scene",
        className: "primary",
      },
      children: undefined,
    });
  });

  it("Should parse disabled button", () => {
    const input = `<button disabled>Terkunci</button>`;
    const result = Parser.parse(input);

    expect(result[0].props).toEqual({ disabled: true }) as AiragaNodeProps["disabled"];
  });
});