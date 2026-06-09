import { createNode } from "@airaga/parser/helpers/create-node.js";
import type { ArgAttributes, ArgNode } from "@airaga/parser/types/ast.js";

export class Scene {
  /**
   * @description The main container for a distinct part of the game's story.
   *              The properties can include attributes such as `id`, `name`, etc., and the
   *              child elements are the content inside the scene.
   * @param {ArgAttributes} [props] - The properties for the scene element.
   * @param {ArgNode[]} children - The child elements inside the scene.
   * @returns {ArgNode}
   * @example <scene id="start">...</scene>
   */
  public static scene(props?: ArgAttributes, children: ArgNode[] = []): ArgNode {
    return createNode("scene", "", props, children);
  }

  /**
   * @description A narrative choice that leads the player to another scene.
   * @param {string} label - The text to display for the choice.
   * @param {ArgAttributes} [props] - The properties for the choice element.
   * @returns {ArgNode}
   * @example <choice target="scene-2">Open the door</choice>
   */
  public static choice(label: string, props?: ArgAttributes): ArgNode {
    return createNode("choice", label, props);
  }

  /**
   * @description Represents character speech, often integrated with UI portraits and names.
   * @param {string} content - The text of the dialogue.
   * @param {ArgAttributes} [props] - The properties for the dialogue element.
   * @returns {ArgNode}
   * @example <dialogue char="hero" mood="happy">Hello there!</dialogue>
   */
  public static dialogue(content: string, props?: ArgAttributes): ArgNode {
    return createNode("dialogue", content, props);
  }

  /**
   * @description A standard hyperlink, useful for external links or simple UI navigation.
   * @param {string} label - The text to display for the link.
   * @param {ArgAttributes} [props] - The properties for the link element.
   * @returns {ArgNode}
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a
   * @example <a href="https://example.com">Visit our website</a>
   */
  public static a(label: string, props?: ArgAttributes): ArgNode {
    return createNode("a", label, props);
  }
}