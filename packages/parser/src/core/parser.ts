import { attributeRegex } from "@airaga/parser/constants/attributes.js";
import { createNode } from "@airaga/parser/helpers/create-node.js";
import type { ArgAttributes, ArgNode, ArgNodeType } from "@airaga/parser/types/ast.js";

export class Parser {
  /**
   * Set of self-closing or void elements that cannot have children.
   */
  private static readonly VOID_ELEMENTS = new Set(["input", "img", "br", "checkbox", "audio", "video"]);

  /**
   * Parses a raw attributes string into an ArgAttributes object.
   * @param {string} attributes - Raw string of HTML-like attributes.
   * @returns {ArgAttributes} Parsed attributes object.
   */
  private static parseAttributes(attributes: string): ArgAttributes {
    const props: ArgAttributes = {};
    let match: RegExpExecArray | null;
    attributeRegex.lastIndex = 0;

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
   * Parses a raw string from an .arg file into an Abstract Syntax Tree (AST)
   * using a stack-based approach.
   * @param {string} input - The raw string content from the file.
   * @returns {ArgNode[]} An array of ArgNode objects representing the root elements.
   */
  public static parse(input: string): ArgNode[] {
    const rootNodes: ArgNode[] = [];
    const stack: ArgNode[] = [];

    /**
     * Regex capture groups:
     * 1: Closing slash (if any) -> /
     * 2: Tag name               -> scene, h1, input
     * 3: Attributes string      -> name="hero" mood="happy"
     * 4: Self-closing slash     -> /
     */
    const tagRegex = /<(\/)?([a-zA-Z0-9-]+)([^>]*?)(\/?)>/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = tagRegex.exec(input)) !== null) {
      const textContent = input.slice(lastIndex, match.index);
      const normalizedText = textContent.replace(/\s+/g, " ").trim();

      if (normalizedText && stack.length > 0) {
        const parent = stack[stack.length - 1];
        parent.content = parent.content ? `${parent.content} ${normalizedText}` : normalizedText;
      }

      const isClosingTag = !!match[1];
      const tagName = match[2].toLowerCase() as ArgNodeType;
      const attributes = match[3].trim();
      const isExplicitlySelfClosing = !!match[4];
      const isVoidElement = this.VOID_ELEMENTS.has(tagName) || isExplicitlySelfClosing;

      if (isClosingTag) {
        stack.pop();
        lastIndex = tagRegex.lastIndex;
        continue;
      }

      const props = this.parseAttributes(attributes);
      const node = createNode(tagName, "", props, []);

      if (stack.length > 0) {
        const parent = stack[stack.length - 1];
        parent.children ??= [];
        parent.children.push(node);
      } else {
        rootNodes.push(node);
      }

      if (!isVoidElement) {
        stack.push(node);
      }

      lastIndex = tagRegex.lastIndex;
    }

    return rootNodes;
  }
}