interface ChoiceAttributes {
  label: string;
  next: string;
  condition?: string;
}

interface ElementAttributes {
  type: string;
  props?: Record<string, string | unknown>;
  children?: ElementAttributes[] | string;
}

export interface AiragaElements {
  /**
   * @description
   * Game menu definition, with option key → label.
   * @example
   * <main-menu new="Start New Game" continue="Continue" />
   */
  mainMenu?: Array<Record<string, string>>;
  /**
   * @description
   * Scene content. Can include markup/tags or be pure text.
   * @example
   * <scene>
   *   Hello, world!
   * </scene>
   */
  scene?: string;
  /**
   * @description
   * Optional choices leading to other scenes.
   * @example
   * <choices={[{ label: "Go left", next: "scene2" }]} />
   */
  choices?: ChoiceAttributes[];
  /**
   * @description
   * Optional background music or sound effect cue.
   * It looks like <audio /> in HTML.
   * @example
   * <audio src="audio.mp3" />
   */
  audio: ElementAttributes;
  /**
   * Break line element.
   * It looks like <br /> in HTML.
   */
  br?: ElementAttributes;
  /**
   * Horizontal rule element.
   * It looks like <hr /> in HTML.
   */
  hr?: ElementAttributes;
  /**
   * Image element.
   * It looks like <img /> in HTML.
   */
  img?: ElementAttributes;
}