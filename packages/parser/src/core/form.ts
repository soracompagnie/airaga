import type { AiragaNode, AiragaNodeProps, NodeType } from "@airaga/parser/types/ast";

export class Form {
  /**
   * @param type
   * @param content
   * @param props
   * @param children
   * @returns {AiragaNode}
   * @private
   * @description Helper method to create an AiragaNode.
   */
  private static create(type: NodeType, content: string, props?: AiragaNodeProps, children?: AiragaNode[]): AiragaNode {
    return { type, content, props, children };
  }

  /**
   * @param label
   * @param props
   * @returns {AiragaNode}
   * @example
   * ```html
   *  <button disabled="true">Upgrade</button>
   * ```
   */
  public static button(label: string, props?: AiragaNodeProps): AiragaNode {
    return this.create("button", label, props);
  }

  /**
   * @param label
   * @param props
   * @returns {AiragaNode}
   * @example
   * ```html
   * <input type="text" name="username" placeholder="Enter your username" />
   * ```
   */
  public static input(label: string, props?: AiragaNodeProps): AiragaNode {
    return this.create("input", label, props);
  }

  /**
   * @param props
   * @param children
   * @returns {AiragaNode}
   * @example
   * ```html
   * <select name="class">
   *  <option>Warrior</option>
   *  ...
   * </select>
   * ```
   */
  public static select(props?: AiragaNodeProps, children: AiragaNode[] = []): AiragaNode {
    return this.create("select", "", props, children);
  }

  /**
   * @param props
   * @param children
   * @returns {AiragaNode}
   * @example
   * ```html
   * <radio name="gender">
   *  <option>Male</option>
   *  ...
   * </radio>
   * ```
   */
  public static radio(props?: AiragaNodeProps, children: AiragaNode[] = []): AiragaNode {
    return this.create("radio", "", props, children);
  }

  /**
   * @param label
   * @param props
   * @returns {AiragaNode}
   * @example
   * ```html
   *  <option value="sword">Iron Sword</option>
   * ```
   */
  public static option(label: string, props?: AiragaNodeProps): AiragaNode {
    return this.create("option", label, props);
  }
}