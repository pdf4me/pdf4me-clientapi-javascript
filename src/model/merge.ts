import { Document, DocMetadata } from "./model";
export type Merge = {
  documents: Array<Document>;
  mergeAction?: MergeAction;
  jobIdExtern?: string;
  integrations?: Array<string>;
};

export type MergeAction = {
  // customProperties?: Array<KeyValuePair> | KeyValuePair;
};
export type MergeRes = {
  document: Document;
  inDocMetadata?: DocMetadata;
  traceId?: string;
  jobId?: string;
};
