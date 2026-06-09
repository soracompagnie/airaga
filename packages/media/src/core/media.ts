import { createNode } from "@airaga/parser/helpers/create-node.js";
import type { ArgAttributes, ArgNode } from "@airaga/parser/types/ast.js";

export class Media {
  /**
   * @description Creates an audio element for background music or sound effects.
   * @param {string} src - The source path or URL of the audio file.
   * @param {ArgAttributes} [props] - Additional attributes (e.g., autoplay, loop).
   * @returns {ArgNode}
   * @example <audio src="/assets/bgm-boss.mp3" loop="true" autoplay="true" />
   */
  public static audio(src: string, props?: ArgAttributes): ArgNode {
    return createNode("audio", "", { ...props, src });
  }

  /**
   * @description Creates an image element. In the Airaga ecosystem,
   * these images will later be optimized and cached by @airaga/media.
   * @param {string} src - The source path or URL of the image.
   * @param {string} [alt=""] - Alternative text for screen readers and missing images.
   * @param {ArgAttributes} [props] - Additional attributes (e.g., width, height, className).
   * @returns {ArgNode}
   * @example <img src="/assets/hero.png" alt="Hero Portrait" />
   */
  public static img(src: string, alt: string = "", props?: ArgAttributes): ArgNode {
    return createNode("img", "", { ...props, src, alt });
  }

  /**
   * @description Creates a video element, typically used for cutscenes.
   * @param {string} src - The source path or URL of the video file.
   * @param {ArgAttributes} [props] - Additional attributes (e.g., autoplay, controls).
   * @returns {ArgNode}
   * @example <video src="/assets/cutscene-1.mp4" autoplay="true" />
   */
  public static video(src: string, props?: ArgAttributes): ArgNode {
    return createNode("video", "", { ...props, src });
  }
}