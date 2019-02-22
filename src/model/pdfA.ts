import { Document, DocMetadata } from "./model";

export type CreatePdfA = {
  document: Document;
  pdfAAction?: PdfAAction;
  jobIdExt?: string;
  integrations?: Array<string>;
};

export type CreatePdfARes = {
  document: Document;
  inDocMetadata?: DocMetadata;
  traceId?: string;
  jobId?: string;
};

export type PdfAAction = {
  fontsToSubset?: Array<PdfFont> | PdfFont;

  compliance?:
    | "pdfA1b"
    | "pdfA1a"
    | "pdfA2b"
    | "pdfA2u"
    | "pdfA2a"
    | "pdfA3b"
    | "pdfA3u"
    | "pdfA3a";

  allowDowngrade?: boolean;
  allowUpgrade?: boolean;
  outputIntentProfile?: "notSet" | "sRGBColorSpace";
  linearize?: boolean;
  // customProperties?: Array<KeyValuePair> | KeyValuePair;
};
export type PdfFont = {
  name: string;
  fontContent?: string;
};
