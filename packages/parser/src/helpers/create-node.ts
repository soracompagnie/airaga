import type { ArgAttributes, ArgNode, ArgNodeType } from "@airaga/parser";

/**
 * @description Helper utility to generate an Airaga Node for the AST.
 * @param {ArgNodeType} type - The type of the node (e.g., "h1", "p", "button").
 * @param {string} content - The textual content of the node.
 * @param {ArgAttributes} props - Optional properties/attributes for the node.
 * @param {ArgNode[]} children - Optional child nodes for nested structures.
 * @returns {ArgNode} An Airaga Node representing the structured element in the AST.
 */
export function createNode(
  type: ArgNodeType,
  content?: string,
  props?: ArgAttributes,
  children?: ArgNode[],
): ArgNode {
  return { type, content, props, children };
}
