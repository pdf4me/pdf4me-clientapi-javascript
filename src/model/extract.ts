import { Document, DocMetadata } from "./model";

export type Extract = {
  document: Document;
  extractAction: ExtractAction;
  jobIdExtern?: string;
  integrations?: Array<string>;
};

export type ExtractAction = {
  extractPages: Array<number>;
  // customProperties?: Array<KeyValuePair> | KeyValuePair;
};

export type ExtractRes = {
  document: Document;
  inDocMetadata?: DocMetadata;
  traceId?: string;
  jobId?: string;
};
