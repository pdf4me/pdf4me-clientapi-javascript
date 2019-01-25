export type Pdf4meException = {
  errorMessage?: string;

  traceId?: string;
};

export type Document = {
  documentId?: string;
  documentIdExtern?: string;
  name?: string;
  docStatus?: string;
  pages?: Array<Page>;
  docData?: string;
  docMetadata?: DocMetadata;
  docLogs?: Array<DocLog> | DocLog;
  notification?: Notification;
};

export type Page = {
  documentId?: string;
  pageId?: string;
  pageNumber?: number;
  rotate?: number;
  thumbnail?: string;
  sourceDocumentId?: string;
  sourcePageNumber?: number;
};

export type DocMetadata = {
  title?: string;

  subject?: string;

  pageCount?: number;

  size?: number;

  isEncrypted?: boolean;

  pdfCompliance?: string;

  isSigned?: boolean;

  "uploadedMimeexport type"?: string;

  uploadedFileSize?: number;

  documentId?: string;
};
export type DocLog = {
  "messageexport type"?: string;

  message?: string;

  timestamp?: string;

  docLogLevel?: "verbose" | "info" | "warning" | "error" | "timing";

  durationMilliseconds?: number;
};

export type KeyValuePair = {
  key: any;
  value?: any;
};

export type ConvertToPdfRes = {
  document: Document;
  inDocMetadata?: DocMetadata;
  jobId?: string;
  documentId?: string;
};
export type GetDocumentListRes = {
  documentList?: Array<Document> | Document;
  docLogs?: Array<DocLog> | DocLog;
  pricing?: Pricing;
  success?: boolean;
  errorMsg?: string;
  exception?: {};
};
export type Pricing = {
  currency?: string;
  totalCost?: number;
  pageCnt?: number;
  documentCnt?: number;

  "pricingexport typeRequired"?: "free" | "basic" | "premium" | "enterprise";

  "pricingexport typeOfUser"?: "free" | "basic" | "premium" | "enterprise";
};
export type GetDocumentRes = {
  document?: Pdf4meDocument;
  docLogs?: Array<DocLog> | DocLog;
  pricing?: Pricing;
  documentList?: Array<Document> | Document;
  success?: boolean;
  errorMsg?: string;
  exception?: {};
};
export type Pdf4meDocument = {
  "documentexport type"?:
    | "uploadDoc"
    | "converted"
    | "stamped"
    | "ocr"
    | "split"
    | "optimize"
    | "merge";

  blobRef?: string;

  jobId?: string;

  refDocumentId?: string;

  refDocAction?: DocAction;

  documentId?: string;

  userId?: string;

  name?: string;

  ratio?: number;

  docStatus?:
    | "undef"
    | "error"
    | "finished"
    | "uploaded"
    | "loading"
    | "loaded"
    | "converting"
    | "converted"
    | "optimizing"
    | "optimized"
    | "doingOcr"
    | "ocred"
    | "doingZip"
    | "stamping"
    | "stamped"
    | "processing";

  inExecution?: boolean;

  order?: number;

  showDoc?: boolean;

  docData?: string;

  thumbnail?: string;

  pages?: Array<Page> | Page;

  thumbnails?: Array<string> | string;

  docLogs?: Array<DocLog> | DocLog;

  docMetadata?: DocMetadata;

  originalDocMetadata?: DocMetadata;

  storageProviderBroker?: "undef" | "kloudless";

  storageProvider?:
    | "undef"
    | "local"
    | "url"
    | "oneDrive"
    | "dropbox"
    | "googleDrive"
    | "kloudless";

  storageAccountId?: string;

  storageProviderId?: string;

  storageProviderFolderId?: string;
};
export type DocAction = {
  customProperties?: Array<KeyValuePair> | KeyValuePair;
};
export type GetDocumentReq = {
  jobId?: string;

  documentId?: string;

  thumbnailsOnly?: boolean;

  "documentexport type"?: string;

  getNotified?: boolean;

  connectionId?: string;

  userFingerprint?: UserFingerprint;
};
export type UserFingerprint = {
  ipAdress?: string;

  browser?: string;
};
export type DropDocumentReq = {
  notification?: Notification;

  jobId?: string;

  documentId?: string;

  userId?: string;

  url?: string;

  document?: string;

  fileName?: string;

  cloudStorageProvider?:
    | "undef"
    | "local"
    | "url"
    | "oneDrive"
    | "dropbox"
    | "googleDrive"
    | "kloudless";

  cloudStorageFiles?: Array<string> | string;

  cloudStorageFilesDesc?: string;

  getNotified?: boolean;

  connectionId?: string;

  userFingerprint?: UserFingerprint;
};
export type DropDocumentRes = {
  document?: Document;

  jobId?: string;

  documentList?: Array<Document> | Document;

  docLogs?: Array<DocLog> | DocLog;

  pricing?: Pricing;

  success?: boolean;

  errorMsg?: string;

  exception?: {};
};

export type OcrAction = {
  stapel?: string;

  businesssCardReco?: boolean;

  fullTextSearch?: boolean;

  "outputexport type"?:
    | "undef"
    | "txt"
    | "docx"
    | "xlsx"
    | "pptx"
    | "pdfSearchable"
    | "xml"
    | "rtf"
    | "rtt"
    | "vcf"
    | "json";

  customProperties?: Array<KeyValuePair> | KeyValuePair;
};

export type ProduceOutput = {
  "fileexport type"?: "undef" | "pdf" | "zip";
};

export type StorageFolder = {
  "storageexport type"?: "undef" | "localSystem";

  folderName?: string;

  host?: string;
};
export type ExecutionTrigger = {
  startTime?: string;

  cronTrigger?: string;

  continues?: boolean;
};

export type SignatureConfig = {};

export type ArchiveJobRes = {
  jobId?: string;

  createdSuccessfully?: boolean;
};
export type Job = {
  jobId?: string;

  jobConfigId?: string;

  documents?: Array<Document> | Document;
};
export type RunJobRes = {
  jobId?: string;

  documents?: Array<Document> | Document;

  notification?: Notification;
};
export type JobConfig = {
  jobConfigId?: string;

  enabled?: boolean;

  active?: boolean;

  creationDate?: string;

  modDate?: string;

  name?: string;

  userId?: string;

  sourceFolder?: StorageFolder;

  executionTrigger?: ExecutionTrigger;

  actionFlow?: ActionFlow;

  targetFolder?: StorageFolder;
};
export type ActionFlow = {
  actions?: Array<Pdf4meAction> | Pdf4meAction;
};
export type Pdf4meAction = {
  actionId?: string;

  "actionexport type"?:
    | "undef"
    | "user"
    | "optimize"
    | "pdfA"
    | "ocrDocument"
    | "ocrBusCard"
    | "convertToPdf"
    | "stamp"
    | "split"
    | "merge"
    | "scanMrc"
    | "createThumbnail"
    | "createImage"
    | "extract";

  userAction?: string;

  actionConfig?: string;

  actionProperties?: Array<KeyValuePair> | KeyValuePair;
};
/*export type KeyValuePair[String, Object] = {
    'key'?: string

    'value'?: {}

};*/
export type JobConfigRes = {
  jobConfigId?: string;
};
export type VersionRes = {
  version?: string;
};

export type RecognizeDocument = {
  document?: Document;

  ocrAction?: OcrAction;

  notification?: Notification;
};
export type RecognizeDocumentRes = {
  document?: Document;

  structuredDataJson?: string;
};

/*
export type ProduceDocuments = {
  jobId?: string;

  documents?: Array<Document> | Document;

  ocrAction?: OcrAction;

  pdfAAction?: PdfAAction;

  optimizeAction?: OptimizeAction;

  produceOutput?: ProduceOutput;

  notification?: Notification;
};

export type ProduceDocumentsRes = {
  documents?: Array<Document> | Document;
};

export type ApiUsageRes = {
  apiUsage?: number;

  payedUsage?: number;

  lastPayment?: string;

  paymentProfile?: string;
};


export type ArchiveConfig = {
  archiveMetadata?: Array<KeyValuePair> | KeyValuePair;

  stampAction?: StampAction;

  signatureConfig?: SignatureConfig;

  useTSA?: boolean;
};


export type ArchiveJobReq = {
  jobId?: string;

  sourceFolder?: StorageFolder;

  executionTrigger?: ExecutionTrigger;

  archiveConfig?: ArchiveConfig;

  targetFolder?: StorageFolder;
};


*/
