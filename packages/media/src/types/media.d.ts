/**
 * This interface defines the properties that can be used to specify the characteristics
 * of a media element, such as its dimensions, loading behavior, and priority.
 * These attributes can be used when rendering media elements in the application to ensure
 * they are displayed correctly and efficiently.
 */
export interface ArgMediaAttributes {
  /** The height of the media element. */
  height?: number;

  /** The width of the media element. */
  width?: number;

  /** The loading behavior of the media element. */
  loading?: "eager" | "lazy";

  /** The priority of the media element. */
  priority?: boolean | "true" | "false";
}