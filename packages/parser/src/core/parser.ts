import {
  type ArgAttributes,
  type ArgNode,
  type ArgNodeType,
  createNode,
} from "@airaga/parser";

export class Parser {
  /**
   * @description A set of void elements that do not require closing tags.
   *              This is used to determine if a tag is self-closing during parsing.
   * @type {Set<string>} - A set of lowercase tag names that are considered void elements.
   * @remarks This list can be extended based on the needs of the project, but it includes
   *          common HTML void elements and media tags that are often self-closing.
   */
  private static readonly VOID_ELEMENTS = new Set([
    "input",
    "img",
    "br",
    "checkbox",
    "audio",
    "video",
  ]);

  /**
   * @description A regular expression to match HTML-like attributes in a tag. It supports:
   *              - Double-quoted attributes (e.g., key="value")
   *              - Single-quoted attributes (e.g., key='value')
   *              - Unquoted attributes (e.g., key)
   * @type {RegExp} - A global regular expression to extract attribute key-value pairs from a string.
   * @remarks The regex captures the attribute name and value in different groups depending on the quoting style.
   *          It also allows for boolean attributes (e.g., disabled) which are treated as true.
   */
  private static readonly ATTRIBUTE_REGEX: RegExp =
    /([a-zA-Z0-9-]+)="([^"]*)"|([a-zA-Z0-9-]+)='([^']*)'|([a-zA-Z0-9-]+)/g;

  /**
   * @description Recursively traverses the AST and replaces original media sources with hashed paths.
   * @param {ArgNode[]} nodes - The array of AST nodes to process.
   * @param {Record<string, string>} manifest - The asset manifest dictionary.
   */
  public static applyManifest(
    nodes: ArgNode[],
    manifest: Record<string, string>,
  ): void {
    for (const node of nodes) {
      const src = node.props?.src as string | undefined;

      if (src && manifest[src] && node.props) {
        node.props.src = manifest[src];
      }

      if (node.children?.length) {
        this.applyManifest(node.children, manifest);
      }
    }
  }

  /**
   * @description Parses a raw attributes string into an ArgAttributes object.
   * @param {string} attributes - Raw string of HTML-like attributes.
   * @returns {ArgAttributes} Parsed attributes object.
   */
  private static parseAttributes(attributes: string): ArgAttributes {
    const props: ArgAttributes = {};
    let match: RegExpExecArray | null;
    this.ATTRIBUTE_REGEX.lastIndex = 0;

    while ((match = this.ATTRIBUTE_REGEX.exec(attributes)) !== null) {
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
   * @description Parses a raw string from an .arg file into an Abstract Syntax Tree (AST).
   * @param {string} input - The raw string content from the file.
   * @returns {ArgNode[]} An array of ArgNode objects representing the root elements.
   */
  public static parse(input: string): ArgNode[] {
    const rootNodes: ArgNode[] = [];
    const stack: ArgNode[] = [];
    const tagRegex = /<(\/)?([a-zA-Z0-9-]+)([^>]*?)(\/?)>/g;

    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = tagRegex.exec(input)) !== null) {
      const textContent = input.slice(lastIndex, match.index);
      const normalizedText = textContent.replace(/\s+/g, " ").trim();

      if (normalizedText && stack.length > 0) {
        const parent = stack[stack.length - 1];
        parent.content = `${parent.content || ""} ${normalizedText}`.trim();
      }

      const isClosingTag = !!match[1];
      const tagName = match[2].toLowerCase() as ArgNodeType;
      const attributes = match[3].trim();
      const isExplicitlySelfClosing = !!match[4];
      const isVoidElement =
        this.VOID_ELEMENTS.has(tagName) || isExplicitlySelfClosing;

      lastIndex = tagRegex.lastIndex;

      if (isClosingTag) {
        stack.pop();
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

      if (!isVoidElement) stack.push(node);
    }

    return rootNodes;
  }
}
