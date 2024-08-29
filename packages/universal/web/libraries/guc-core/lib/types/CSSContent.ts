export interface CSSContent {
  media?: Media;
  selector: string;
  content: string;
}

export type Media = MediaCompound | MediaTerminal;

export interface MediaCompound {
  type: "and" | "or";
  media: Media[];
}

export interface MediaTerminal {
  type: "terminal";
  media: string;
}
