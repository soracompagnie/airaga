import { type ArgAttributes, type ArgNode, createNode } from "@airaga/parser";

export class Layout {
  /**
   * @description Creates a block-level container element.
   *              The properties can include attributes such as `id`, `class`, etc., and the
   *              child elements are the content inside the div.
   * @param {ArgAttributes} [props] - The properties for the div element.
   * @param {ArgNode[]} children - The child elements inside the div.
   * @returns {ArgNode}
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div
   * @example
   * ```html
   * <div id="container" class="main">
   *   <p>Content goes here</p>
   * </div>
   * ```
   */
  public static div(props?: ArgAttributes, children: ArgNode[] = []): ArgNode {
    return createNode("div", "", props, children);
  }

  /**
   * @description Creates a section element for grouping related content.
   *              The properties can include attributes such as `id`, `class`, etc., and the
   *              child elements are the content inside the section.
   * @param {ArgAttributes} [props] - The properties for the section element.
   * @param {ArgNode[]} children - The child elements inside the section.
   * @returns {ArgNode}
   */
  public static section(
    props?: ArgAttributes,
    children: ArgNode[] = [],
  ): ArgNode {
    return createNode("section", "", props, children);
  }

  /**
   * @description Creates an inline container element.
   *              The content parameter is the text that will be displayed inside the span,
   *              and the properties can include attributes such as `id`, `class`, etc.
   * @param {string} content - The text to be displayed inside the span.
   * @param {ArgAttributes} [props] - The properties for the span element.
   * @returns {ArgNode}
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span
   * @example
   * ```html
   * <span id="highlight" class="important">Important text</span>
   * ```
   */
  public static span(content: string, props?: ArgAttributes): ArgNode {
    return createNode("span", content, props);
  }
}
