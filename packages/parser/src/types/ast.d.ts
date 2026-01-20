export type NodeType =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "input"
  | "select"
  | "radio"
  | "option"
  | "checkbox"
  | "textarea"
  | "button"
  | "ul"
  | "ol"
  | "li"
  | "b"
  | "i"
  | "u"
  | "s"
  | "pre";

export interface AiragaNodeProps {
  className?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  action?: string;
  disabled?: boolean;
  [key: string]: unknown;
}

export interface AiragaNode {
  type: NodeType;
  content?: string;
  props?: AiragaNodeProps;
  children?: AiragaNode[];
}