import { Document, DocMetadata } from "./model";

export type ConvertToPdf = {
  document: Document;
  convertToPdfAction: ConvertToPdfAction;
  jobIdExt?: string;
  integrations?: Array<string>;
};

export type ConvertToPdfAction = {
  pdfConformance?: "pdf17" | "pdfA1" | "pdfA2" | "pdfA3";
  conversionMode?: "fast" | "detailed";
  // customProperties?: Array<KeyValuePair> | KeyValuePair;
};

export type ConvertToPdfRes = {
  document: Document;
  inDocMetadata?: DocMetadata;
  jobId?: string;
  documentId?: string;
};
