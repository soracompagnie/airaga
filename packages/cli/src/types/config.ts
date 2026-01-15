export interface Config {
  ifid: string | null;
  name: string;
  description: string;
  version: string;
  author: string | string[];
  autosave?: boolean;
  fonts?: string;
  theme?: boolean;
}