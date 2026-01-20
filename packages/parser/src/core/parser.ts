import { attributeRegex } from "@airaga/parser/constants/attributes";
import { Form } from "@airaga/parser/core/form";
import { Heading } from "@airaga/parser/core/heading";
import type { AiragaNode, AiragaNodeProps, NodeType } from "@airaga/parser/types/ast";

export class Parser {
  /**
   * Parses raw attributes string into a props object.
   * Example input: ' class="text-red-500" id="title"'
   * Output: { className: "text-red-500", id: "title" }
   */
  private static parseAttributes(attributes: string): AiragaNodeProps {
    const props: AiragaNodeProps = {};

    // Regex to match key="value" pattern
    
    let match;

    while ((match = attributeRegex.exec(attributes)) !== null) {
      const key = match[1] || match[3] || match[5];
      const value = match[2] || match[4] || "true";

      if (!key) continue;

      if (key === "class") props.className = value;
      else if (value === "true") props[key] = true;
      else if (value === "false") props[key] = false;
      else props[key] = value;
    }

    return props;
  }

  /**
   * @param text
   * @returns normalized text with single spaces and trimmed ends
   */
  private static normalizeWhitespace(text: string): string {
    return text.replace(/\s+/g, " ").trim();
  }

  /**
   * Parses a raw string from an .arg file into an Abstract Syntax Tree (AST).
   * * @param input - The raw string content from the file.
   * @returns An array of AiragaNode objects.
   * * @example
   * ```ts
   * const nodes = Parser.parse('<h1 class="text-bold">Title</h1>');
   * ```
   */
  public static parse(input: string): AiragaNode[] {
    const nodes: AiragaNode[] = [];

    // Regex Explanation:
    // <(h[1-6]|p)   -> Capture opening tag type (Group 1)
    // ([^>]*)       -> Capture attributes string (Group 2)
    // >(.*?)<\/\1>  -> Capture content (Group 3) & ensure matching closing tag
    const regex = /<(h[1-6]|p|b|i|u|s|pre|input|select|radio|option|button)([^>]*)>(.*?)<\/\1>/gs;
    let match;

    while ((match = regex.exec(input)) !== null) {
      const props = this.parseAttributes(match[2].trim());
      const content = this.normalizeWhitespace(match[3]);

      switch (match[1] as NodeType) {
        case "h1":
          nodes.push(Heading.h1(content, props));
          break;
        case "h2":
          nodes.push(Heading.h2(content, props));
          break;
        case "h3":
          nodes.push(Heading.h3(content, props));
          break;
        case "h4":
          nodes.push(Heading.h4(content, props));
          break;
        case "h5":
          nodes.push(Heading.h5(content, props));
          break;
        case "h6":
          nodes.push(Heading.h6(content, props));
          break;
        case "p":
          nodes.push(Heading.p(content, props));
          break;
        case "b":
          nodes.push(Heading.b(content, props));
          break;
        case "i":
          nodes.push(Heading.i(content, props));
          break;
        case "u":
          nodes.push(Heading.u(content, props));
          break;
        case "s":
          nodes.push(Heading.s(content, props));
          break;
        case "pre":
          nodes.push(Heading.pre(content, props));
          break;
        case "button":
          nodes.push(Form.button(content, props));
          break;
        case "input":
          nodes.push(Form.input(content, props));
          break;
        case "option":
          nodes.push(Form.option(content, props));
          break;
        case "select":
          nodes.push(Form.select(props, this.parse(match[3])));
          break;
        case "radio":
          nodes.push(Form.radio(props, this.parse(match[3])));
          break;
      }
    }

    return nodes;
  }
}