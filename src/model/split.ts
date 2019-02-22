import { Document, DocMetadata } from "./model";

export type Split = {
  document: Document;
  splitAction: SplitAction;
  jobIdExt?: string;
  integrations?: Array<string>;
};

export type SplitAction = {
  splitAfterPage?: number;
  splitSequence?: Array<number>;
  recurringSplitAfterPage?: number;
  // customProperties?: Array<KeyValuePair> | KeyValuePair;
};

export type SplitRes = {
  documents: Array<Document>;
  inDocMetadata: Array<DocMetadata>;
  traceId: string;
  jobId: string;
};
