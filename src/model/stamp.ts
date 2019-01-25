import { Document, DocMetadata } from "./model";

export type Stamp = {
  document: Document;
  stampAction: StampAction;
  jobIdExtern?: string;
  integrations?: Array<string>;
};

export type StampRes = {
  document?: Document;

  inDocMetadata?: DocMetadata;

  traceId?: string;

  jobId?: string;
};

export type StampAction = {
  pageSequence?: string;

  relativePosX?: number;

  relativePosY?: number;

  sizeX?: number;

  sizeY?: number;

  rotate?: number;

  autoorientation?: boolean;

  alpha?: number;

  scale?: "relToA4";

  alignX?: "left" | "center" | "right";

  alignY?: "top" | "middle" | "bottom";

  stampType?: "annotation" | "foreground" | "background";

  text?: Text;

  image?: Image;

  // customProperties?: Array<KeyValuePair> | KeyValuePair;
};

export type Text = {
  format?: boolean;

  size?: number;

  font?: string;

  color?: Color;

  fontEncoding?: "unicode" | "winAnsi";

  value?: string;

  mode?: "fill" | "stroke";

  rotate?: Rotate;

  translate?: Translate;

  transform?: Transform;
};
export type Image = {
  rectangle?: Rectangle;

  imageData?: string;

  imageType?: string;

  fileName?: string;

  compression?: "cCITTFax" | "flate" | "dCT";

  rotate?: Rotate;

  translate?: Translate;

  transform?: Transform;
};

export type Color = {
  red?: number;

  green?: number;

  blue?: number;
};
export type Rotate = {
  angle?: number;

  originX?: number;

  originY?: number;
};
export type Translate = {
  offsetX?: number;

  offsetY?: number;
};
export type Transform = {
  a?: number;

  b?: number;

  c?: number;

  d?: number;

  x?: number;

  y?: number;
};
export type Rectangle = {
  x?: number;

  y?: number;

  width?: number;

  height?: number;
};
