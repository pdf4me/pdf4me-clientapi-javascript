import { Document, DocMetadata } from "./model";

export type CreateImages = {
  document: Document;
  imageAction: ImageAction;
  jobIdExtern?: string;
  integrations?: Array<string>;
};

export type ImageAction = {
  pageSelection?: PageSelection;
  center?: boolean;
  fitPage?: boolean;
  bitsPerPixel?: number;
  bilevelThreshold?: number;
  widthPixel?: number;
  heightPixel?: number;
  widthPoint?: number;
  heightPoint?: number;
  renderOptions?:
    | Array<
        | "noAntialiasing"
        | "noInterpolation"
        | "noLowPassFilter"
        | "noHinting"
        | "printingMode"
        | "noBPC"
        | "fitPaths"
        | "useBoxFilter"
      >
    | "noAntialiasing"
    | "noInterpolation"
    | "noLowPassFilter"
    | "noHinting"
    | "printingMode"
    | "noBPC"
    | "fitPaths"
    | "useBoxFilter";

  rotateMode?: "none" | "attribute" | "portrait" | "landscape";
  preserveAspectRatio?: boolean;
  imageQuality?: number;
  cmsEngine?: "none" | "neugebauer" | "lcms" | "customCMS";
  customCMSConfig?: CustomCMSConfig;
  dithering?:
    | "none"
    | "floydSteinberg"
    | "halftone"
    | "pattern"
    | "g3Optimized"
    | "g4Optimized"
    | "atkinson";

  dpi?: number;
  fillOrder?: "mSB" | "lSB";
  filterRatio?: number;
  imageExtension?:
    | "jpg"
    | "jpeg"
    | "bmp"
    | "gif"
    | "jb2"
    | "jp2"
    | "jpf"
    | "jpx"
    | "png"
    | "tif"
    | "tiff";

  colorSpace?:
    | "rGB"
    | "rGBA"
    | "gray"
    | "grayA"
    | "cMYK"
    | "yCbCr"
    | "yCbCrK"
    | "palette"
    | "lAB"
    | "cMYK_Konly"
    | "cMYKA";

  compression?:
    | "lZW"
    | "jPEG"
    | "flate"
    | "raw"
    | "group3"
    | "group3_2D"
    | "group4"
    | "jBIG2"
    | "jPEG2000"
    | "tIFFJPEG";

  // customProperties?: Array<KeyValuePair> | KeyValuePair;
};

export type CustomCMSConfig = {
  white?: RGBSet;

  c?: RGBSet;

  m?: RGBSet;

  y?: RGBSet;

  k?: RGBSet;

  cm?: RGBSet;

  cy?: RGBSet;

  ck?: RGBSet;

  my?: RGBSet;

  mk?: RGBSet;

  yk?: RGBSet;

  cmy?: RGBSet;

  cmk?: RGBSet;

  cyk?: RGBSet;

  myk?: RGBSet;

  cmyk?: RGBSet;
};
export type RGBSet = {
  red?: number;

  green?: number;

  blue?: number;
};

export type PageSelection = {
  pageNrs?: Array<number>;
  pageIds?: Array<string>;
  pageSequence?:
    | "all"
    | "first"
    | "last"
    | "odd"
    | "even"
    | "notFirst"
    | "notLast";
};

export type CreateImagesRes = {
  document: Document;
  inDocMetadata?: DocMetadata;
  traceId?: string;
  jobId?: string;
};
