import { DocMetadata, Document, KeyValuePair } from "./model";

export type Optimize = {
  document: Document;
  optimizeAction: OptimizeAction;
  jobIdExtern?: string;
  integrations?: Array<string>;
};

export type OptimizeAction = {
  profile?: "default" | "web" | "print" | "max";
  useProfile?: boolean;
  removeRedundantObjects?: boolean;
  subsetFonts?: boolean;
  optimizeResources?: boolean;
  forceCompressionTypes?: boolean;
  forceRecompression?: boolean;
  reduceColorComplexity?: boolean;
  mergeEmbeddedFonts?: boolean;
  bitonalCompressions?:
    | Array<
        | "none"
        | "raw"
        | "jPEG"
        | "flate"
        | "lZW"
        | "group3"
        | "group3_2D"
        | "group4"
        | "jBIG2"
        | "jPEG2000"
        | "mRC"
        | "source"
      >
    | "none"
    | "raw"
    | "jPEG"
    | "flate"
    | "lZW"
    | "group3"
    | "group3_2D"
    | "group4"
    | "jBIG2"
    | "jPEG2000"
    | "mRC"
    | "source";

  bitonalResolutionDPI?: number;
  bitonalThresholdDPI?: number;
  clipImages?: boolean;
  continuousCompressions?:
    | Array<
        | "raw"
        | "jPEG"
        | "flate"
        | "lZW"
        | "group3"
        | "group3_2D"
        | "group4"
        | "jBIG2"
        | "jPEG2000"
        | "mRC"
        | "source"
      >
    | "none"
    | "raw"
    | "jPEG"
    | "flate"
    | "lZW"
    | "group3"
    | "group3_2D"
    | "group4"
    | "jBIG2"
    | "jPEG2000"
    | "mRC"
    | "source";

  linearize?: boolean;

  imageQuality?: number;

  indexedCompressions?:
    | Array<
        | "none"
        | "raw"
        | "jPEG"
        | "flate"
        | "lZW"
        | "group3"
        | "group3_2D"
        | "group4"
        | "jBIG2"
        | "jPEG2000"
        | "mRC"
        | "source"
      >
    | "none"
    | "raw"
    | "jPEG"
    | "flate"
    | "lZW"
    | "group3"
    | "group3_2D"
    | "group4"
    | "jBIG2"
    | "jPEG2000"
    | "mRC"
    | "source";

  ditheringMode?:
    | "none"
    | "floydSteinberg"
    | "halftone"
    | "pattern"
    | "g3Optimized"
    | "g4Optimized"
    | "atkinson";

  colorResolutionDPI?: number;
  colorThresholdDPI?: number;
  monochromeResolutionDPI?: number;
  monochromeThresholdDPI?: number;
  resolutionDPI?: number;
  thresholdDPI?: number;
  strip?:
    | Array<
        | "threads"
        | "metadata"
        | "pieceInfo"
        | "structTree"
        | "thumb"
        | "spider"
        | "alternates"
        | "forms"
        | "links"
        | "annots"
        | "formsAnnots"
        | "outputIntents"
        | "all"
      >
    | "threads"
    | "metadata"
    | "pieceInfo"
    | "structTree"
    | "thumb"
    | "spider"
    | "alternates"
    | "forms"
    | "links"
    | "annots"
    | "formsAnnots"
    | "outputIntents"
    | "all";

  infoEntries?: Array<KeyValuePair> | KeyValuePair;
  flattenSignatureFields?: boolean;
  // customProperties?: Array<KeyValuePair> | KeyValuePair;
};

export type OptimizeRes = {
  document: Document;
  inDocMetadata?: DocMetadata;
  traceId?: string;
  jobId?: string;
};
