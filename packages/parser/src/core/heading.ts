import { createNode } from "@airaga/parser/helpers/create-node.js";
import type { ArgAttributes, ArgNode } from "@airaga/parser/types/ast.js";

/**
 * @description Heading elements (h1 to h6) are used to define the structure and
 *              hierarchy of content in a document. They provide a way to organize
 *              information and make it easier for users to navigate through the content.
 *              The numbers (1 to 6) indicate the level of importance, with h1 being the
 *              most important and h6 being the least important.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements
 */
export class Heading {
  /**
   * @description The `h1` tag represents the most important heading in a document.
   *              It is typically used for the main title or heading of a page.
   *              The content within an `h1` tag is usually displayed in a larger
   *              font size and may be styled differently to indicate its importance.
   * @param {string} content - The text content of the heading.
   * @param {ArgAttributes} [props] - Optional attributes for the heading element.
   * @returns {ArgNode} An object representing the heading element in the AST.
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h1
   */
  public static h1(content: string, props?: ArgAttributes): ArgNode {
    return createNode("h1", content, props);
  }

  /**
   * @description The `h2` tag represents the second level of heading in a document.
   *              It is typically used for subheadings or sections within a page.
   *              The content within an `h2` tag is usually displayed in a smaller
   *              font size than `h1` and may be styled differently to indicate its importance.
   * @param {string} content - The text content of the heading.
   * @param {ArgAttributes} [props] - Optional attributes for the heading element.
   * @returns {ArgNode} An object representing the heading element in the AST.
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h2
   */
  public static h2(content: string, props?: ArgAttributes): ArgNode {
    return createNode("h2", content, props);
  }

  /**
   * @description The `h3` tag represents the third level of heading in a document.
   *              It is typically used for sub-subheadings or subsections within a page.
   *              The content within an `h3` tag is usually displayed in a smaller
   *              font size than `h2` and may be styled differently to indicate its importance.
   * @param {string} content - The text content of the heading.
   * @param {ArgAttributes} [props] - Optional attributes for the heading element.
   * @returns {ArgNode} An object representing the heading element in the AST.
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h3
   */
  public static h3(content: string, props?: ArgAttributes): ArgNode {
    return createNode("h3", content, props);
  }

  /**
   * @description The `h4` tag represents the fourth level of heading in a document.
   *              It is typically used for sub-sub-subheadings or subsubsections within a page.
   *              The content within an `h4` tag is usually displayed in a smaller
   *              font size than `h3` and may be styled differently to indicate its importance.
   * @param {string} content - The text content of the heading.
   * @param {ArgAttributes} [props] - Optional attributes for the heading element.
   * @returns {ArgNode} An object representing the heading element in the AST.
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h4
   */
  public static h4(content: string, props?: ArgAttributes): ArgNode {
    return createNode("h4", content, props);
  }

  /**
   * @description The `h5` tag represents the fifth level of heading in a document.
   *              It is typically used for sub-sub-sub-subheadings or subsubsubsections within a page.
   *              The content within an `h5` tag is usually displayed in a smaller
   *              font size than `h4` and may be styled differently to indicate its importance.
   * @param {string} content - The text content of the heading.
   * @param {ArgAttributes} [props] - Optional attributes for the heading element.
   * @returns {ArgNode} An object representing the heading element in the AST.
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h5
   */
  public static h5(content: string, props?: ArgAttributes): ArgNode {
    return createNode("h5", content, props);
  }

  /**
   * @description The `h6` tag represents the sixth level of heading in a document.
   *              It is typically used for sub-sub-sub-subheadings or subsubsubsections within a page.
   *              The content within an `h6` tag is usually displayed in a smaller
   *              font size than `h5` and may be styled differently to indicate its importance.
   * @param {string} content - The text content of the heading.
   * @param {ArgAttributes} [props] - Optional attributes for the heading element.
   * @returns {ArgNode} An object representing the heading element in the AST.
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h6
   */
  public static h6(content: string, props?: ArgAttributes): ArgNode {
    return createNode("h6", content, props);
  }

  /**
   * @description The `p` tag represents a paragraph of text in a document.
   *              It is used to group together related sentences and provide
   *              structure to the content. The content within a `p` tag is typically
   *              displayed as a block of text with some spacing before and after it.
   * @param {string} content - The text content of the paragraph.
   * @param {ArgAttributes} [props] - Optional attributes for the paragraph element.
   * @returns {ArgNode} An object representing the paragraph element in the AST.
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p
   */
  public static p(content: string, props?: ArgAttributes): ArgNode {
    return createNode("p", content, props);
  }

  /**
   * @description The `b` tag represents bold text in a document. It is used to
   *              emphasize text or make it stand out from the surrounding content.
   * @param {string} content - The text content of the bold element.
   * @param {ArgAttributes} [props] - Optional attributes for the bold element.
   * @returns {ArgNode} An object representing the bold element in the AST.
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/b
   */
  public static b(content: string, props?: ArgAttributes): ArgNode {
    return createNode("b", content, props);
  }

  /**
   * @description The `i` tag represents italicized text in a document. It is used to
   *              emphasize text or indicate a change in tone or mood.
   * @param {string} content - The text content of the italic element.
   * @param {ArgAttributes} [props] - Optional attributes for the italic element.
   * @returns {ArgNode} An object representing the italic element in the AST.
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/i
   */
  public static i(content: string, props?: ArgAttributes): ArgNode {
    return createNode("i", content, props);
  }

  /**
   * @description The `u` tag represents underlined text in a document. It is used to
   *              emphasize text or indicate a change in tone or mood.
   * @param {string} content - The text content of the underlined element.
   * @param {ArgAttributes} [props] - Optional attributes for the underlined element.
   * @returns {ArgNode} An object representing the underlined element in the AST.
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/u
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/underline
   */
  public static u(content: string, props?: ArgAttributes): ArgNode {
    return createNode("u", content, props);
  }

  /**
   * @description The `s` tag represents strikethrough text in a document. It is used to
   *                      indicate that text is no longer relevant or accurate.
   * @param {string} content - The text content of the strikethrough element.
   * @param {ArgAttributes} [props] - Optional attributes for the strikethrough element.
   * @returns {ArgNode} An object representing the strikethrough element in the AST.
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/s
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/strike
   */
  public static s(content: string, props?: ArgAttributes): ArgNode {
    return createNode("s", content, props);
  }

  /**
   * @description The `pre` tag represents preformatted text in a document. It is used to
   *              display text exactly as it is written, including whitespace and line breaks.
   * @param {string} content - The text content of the preformatted element.
   * @param {ArgAttributes} [props] - Optional attributes for the preformatted element.
   * @returns {ArgNode} An object representing the preformatted element in the AST.
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/pre
   */
  public static pre(content: string, props?: ArgAttributes): ArgNode {
    return createNode("pre", content, props);
  }
}