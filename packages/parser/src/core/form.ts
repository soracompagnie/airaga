import { createNode } from "@airaga/parser/helpers/create-node.js";
import type { ArgAttributes, ArgNode } from "@airaga/parser/types/ast.js";

export class Form {
  /**
   * @description Creates a button element with the specified label and properties.
   *              The label is the text that will be displayed on the button, and the
   *              properties can include attributes such as `disabled`, `type`, etc.
   * @param {string} label - The text to be displayed on the button.
   * @param {ArgAttributes} [props] - The properties for the button element.
   * @returns {ArgNode}
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button
   * @example
   * ```html
   * <button disabled="true">Upgrade</button>
   * ```
   */
  public static button(label: string, props?: ArgAttributes): ArgNode {
    return createNode("button", label, props);
  }

  /**
   * @description Creates an input element with the specified label and properties.
   *              The label is the placeholder text that will be displayed inside the input field,
   *              and the properties can include attributes such as `type`, `name`, etc.
   * @param {string} label - The placeholder text for the input field.
   * @param {ArgAttributes} [props] - The properties for the input element.
   * @returns {ArgNode}
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
   * @example
   * ```html
   * <input type="text" name="username" placeholder="Enter your username" />
   * ```
   */
  public static input(label: string, props?: ArgAttributes): ArgNode {
    return createNode("input", label, props);
  }

  /**
   * @description Creates a select element with the specified properties and child option elements.
   *              The properties can include attributes such as `name`, `multiple`, etc., and the
   *              child elements are typically option elements that define the available choices.
   * @param {ArgAttributes} [props] - The properties for the select element.
   * @param {ArgNode[]} children - The child option elements.
   * @returns {ArgNode}
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
   * @example
   * ```html
   * <select name="class">
   * <option>Warrior</option>
   * ...
   * </select>
   * ```
   */
  public static select(
    props?: ArgAttributes,
    children: ArgNode[] = [],
  ): ArgNode {
    return createNode("select", "", props, children);
  }

  /**
   * @description Creates a radio element with the specified properties and child option elements.
   *              The properties can include attributes such as `name`, `value`, etc., and the
   *              child elements are typically option elements that define the available choices.
   * @param {ArgAttributes} [props] - The properties for the radio element.
   * @param {ArgNode[]} children - The child option elements.
   * @returns {ArgNode}
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/radio
   * @example
   * ```html
   * <radio name="gender">
   * <option>Male</option>
   * ...
   * </radio>
   * ```
   */
  public static radio(
    props?: ArgAttributes,
    children: ArgNode[] = [],
  ): ArgNode {
    return createNode("radio", "", props, children);
  }

  /**
   * @description Creates an option element with the specified label and properties.
   *              The label is the text that will be displayed for the option, and the
   *              properties can include attributes such as `value`, `selected`, etc.
   * @param {string} label - The text to be displayed for the option.
   * @param {ArgAttributes} [props] - The properties for the option element.
   * @returns {ArgNode}
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option
   * @example
   * ```html
   * <option value="sword">Iron Sword</option>
   * ```
   */
  public static option(label: string, props?: ArgAttributes): ArgNode {
    return createNode("option", label, props);
  }

  /**
   * @description Creates a checkbox element with the specified properties.
   *              The properties can include attributes such as `name`, `checked`, etc.
   * @param {ArgAttributes} [props] - The properties for the checkbox (e.g., name, checked).
   * @returns {ArgNode}
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox
   * @example
   * ```html
   * <checkbox name="subscribe" checked="true" />
   * ```
   */
  public static checkbox(props?: ArgAttributes): ArgNode {
    return createNode("checkbox", "", props);
  }

  /**
   * @description Creates a textarea element for multi-line text input.
   *              The content parameter is the default text that will be displayed inside the textarea,
   *              and the properties can include attributes such as `name`, `placeholder`, etc.
   * @param {string} content - The default text inside the textarea.
   * @param {ArgAttributes} [props] - The properties for the textarea element.
   * @returns {ArgNode}
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea
   * @example
   * ```html
   * <textarea name="message" placeholder="Enter your message here..."></textarea>
   * ```
   */
  public static textarea(content: string = "", props?: ArgAttributes): ArgNode {
    return createNode("textarea", content, props);
  }
}