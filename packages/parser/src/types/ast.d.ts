/**
 * @description Standard emotional states for character dialogues in Airaga.
 * Using (string & {}) allows IDE autocomplete for standard values while still 
 * accepting any custom mood strings defined by the game developer.
 */
export type ArgDialogueMood =
  | "neutral"
  | "happy"
  | "sad"
  | "angry"
  | "shocked"
  | "serious"
  | "thinking"
  | (string & {});

/**
 * @description Defines the valid node types for the Airaga parser.
 *              Grouped logically by their role in the game engine.
 */
export type ArgNodeType =
  | "a"
  | "audio"
  | "b"
  | "br"
  | "button"
  | "checkbox"
  | "choice"
  | "dialogue"
  | "div"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "i"
  | "img"
  | "input"
  | "li"
  | "menu"
  | "ol"
  | "option"
  | "p"
  | "pre"
  | "radio"
  | "s"
  | "scene"
  | "section"
  | "select"
  | "span"
  | "textarea"
  | "u"
  | "ul";

/**
 * @description Defines the attributes that can be associated with an Airaga tags.
 *              This is a flexible structure that can accommodate various HTML-like attributes
 *              as well as custom attributes specific to the game engine.
 */
export interface ArgAttributes {
  /** The CSS class for the element */
  className?: string;

  /** The unique identifier for the element */
  id?: string;

  /** The name attribute for the element */
  name?: string;

  /** The value attribute for the element */
  value?: string;

  /** The placeholder attribute for the element */
  placeholder?: string;

  /** The disabled attribute for the element */
  disabled?: boolean;

  /** The action attribute for the element */
  action?: string;

  /** The target attribute for the element */
  target?: string;

  /** The source attribute for the element */
  src?: string;

  /** The alt attribute for the element */
  alt?: string;

  /** The character attribute for the element */
  char?: string;

  /** The mood attribute for the element, using the defined ArgDialogueMood type */
  mood?: ArgDialogueMood;

  /** Custom attributes for the element */
  [key: string]: unknown;
}

/**
 * @description The core Abstract Syntax Tree node structure for Airaga.
 */
export interface ArgNode {
  /** The type of the node */
  type: ArgNodeType;

  /** The textual content of the node, if applicable */
  content?: string;

  /** The attributes for the node */
  props?: ArgAttributes;

  /** The child nodes of the node */
  children?: ArgNode[];
}