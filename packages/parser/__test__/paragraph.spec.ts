import { describe, expect, it } from "vitest";
import { Parser } from "../src/core/parser";

describe("Airaga Parsing Paragraph", () => {
  it("Should parse standard single-line H1", () => {
    const input = `<h1>Selamat datang.</h1>`;
    const result = Parser.parse(input);
    expect(result[0]).toEqual({ type: "h1", content: "Selamat datang.", props: {} });
  });

  it("Should parse multi-line H1 and normalize whitespace", () => {
    const input = `
      <h1>
        Selamat datang
        di Airaga.
      </h1>
    `;

    const result = Parser.parse(input);
    expect(result[0]).toEqual({ type: "h1", content: "Selamat datang di Airaga.", props: {} });
  });

  it("Should parse attributes correctly (including boolean)", () => {
    const input = `<p class="text-red" hidden>Error occurred</p>`;
    const result = Parser.parse(input);
    expect(result[0].props).toEqual({ className: "text-red", hidden: true });
  });

  it("Should handle multiple nodes in one input", () => {
    const input = `
      <h1 class="title">Welcome</h1>
      <p id="intro">This is the introduction.</p>
    `;
    const result = Parser.parse(input);
    expect(result.length).toBe(2);
    expect(result[0]).toEqual({ type: "h1", content: "Welcome", props: { className: "title" } });
    expect(result[1]).toEqual({ type: "p", content: "This is the introduction.", props: { id: "intro" } });
  });

  it("Should parse empty attributes and content", () => {
    const input = `<p></p>`;
    const result = Parser.parse(input);
    expect(result[0]).toEqual({ type: "p", content: "", props: {} });
  });

  it("Should parse bold text", () => {
    const input = `<b>This is bold text</b>`;
    const result = Parser.parse(input);
    expect(result[0]).toEqual({ type: "b", content: "This is bold text", props: {} });
  });

  it("Should parse italic text", () => {
    const input = `<i>This is italic text</i>`;
    const result = Parser.parse(input);
    expect(result[0]).toEqual({ type: "i", content: "This is italic text", props: {} });
  });

  it("Should parse underlined text", () => {
    const input = `<u>This is underlined text</u>`;
    const result = Parser.parse(input);
    expect(result[0]).toEqual({ type: "u", content: "This is underlined text", props: {} });
  });

  it("Should parse strikethrough text", () => {
    const input = `<s>This is strikethrough text</s>`;
    const result = Parser.parse(input);
    expect(result[0]).toEqual({ type: "s", content: "This is strikethrough text", props: {} });
  });
});