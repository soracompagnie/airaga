import { describe, expect, it } from "vitest";
import { Parser } from "../src/core/parser";
import type { ArgNode } from "../src/types/ast";

describe("Airaga Parsing Paragraph", () => {
  it("Should parse standard single-line H1", () => {
    const input = `<h1>Selamat datang.</h1>`;
    const result = Parser.parse(input);

    expect(result[0]).toEqual<ArgNode>({ type: "h1", content: "Selamat datang.", props: {}, children: [] });
  });

  it("Should parse multi-line H1 and normalize whitespace", () => {
    const input = `
      <h1>
        Selamat datang
        di Airaga.
      </h1>
    `;

    const result = Parser.parse(input);

    expect(result[0]).toEqual<ArgNode>({ type: "h1", content: "Selamat datang di Airaga.", props: {}, children: [] });
  });

  it("Should parse attributes correctly (including boolean)", () => {
    const input = `<p class="text-red" hidden>Error occurred</p>`;
    const result = Parser.parse(input);
    expect(result[0].props).toEqual<ArgNode["props"]>({ className: "text-red", hidden: true });
  });

  it("Should handle multiple nodes in one input", () => {
    const input = `
      <h1 class="title">Welcome</h1>
      <p id="intro">This is the introduction.</p>
    `;

    const result = Parser.parse(input);

    expect(result.length).toBe(2);
    expect(result[0]).toEqual<ArgNode>({ type: "h1", content: "Welcome", props: { className: "title" }, children: [] });
    expect(result[1]).toEqual<ArgNode>({ type: "p", content: "This is the introduction.", props: { id: "intro" }, children: [] });
  });
});