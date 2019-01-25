// clients
import { Pdf4meClient as Pdf4meCl } from "./client/pdf4meClient";

import { ConvertClient as ConvertCl } from "./client/convertClient";
import { ExtractClient as ExtractCl } from "./client/extractClient";
import { ImageClient as ImageCl } from "./client/imageClient";
import { MergeClient as MergeCl } from "./client/mergeClient";
import { OptimizeClient as OptimizeCl } from "./client/optimizeClient";
import { PdfAClient as PdfACl } from "./client/pdfAClient";
import { SplitClient as SplitCl } from "./client/splitClient";
import { StampClient as StampCl } from "./client/stampClient";

export type Pdf4meClient = Pdf4meCl;
export const Pdf4meClient = Pdf4meCl;
export type ConvertClient = ConvertCl;
export const ConvertClient = ConvertCl;
export type ExtractClient = ExtractCl;
export const ExtractClient = ExtractCl;
export type ImageClient = ImageCl;
export const ImageClient = ImageCl;
export type MergeClient = MergeCl;
export const MergeClient = MergeCl;
export type OptimizeClient = OptimizeCl;
export const OptimizeClient = OptimizeCl;
export type PdfAClient = PdfACl;
export const PdfAClient = PdfACl;
export type SplitClient = SplitCl;
export const SplitClient = SplitCl;
export type StampClient = StampCl;
export const StampClient = StampCl;

// model
export * from "./model/model";
export {
  ConvertToPdf,
  ConvertToPdfAction,
  ConvertToPdfRes
} from "./model/convert";
export { Extract, ExtractAction, ExtractRes } from "./model/extract";
export { CreateImages, ImageAction, CreateImagesRes } from "./model/image";
export { Merge, MergeAction, MergeRes } from "./model/merge";
export { Optimize, OptimizeAction, OptimizeRes } from "./model/optimize";
export { Split, SplitAction, SplitRes } from "./model/split";
export { Stamp, StampAction, StampRes } from "./model/stamp";
export { CreatePdfA, CreatePdfARes, PdfAAction } from "./model/pdfA";

// Pdf4meExceptions
import {
  Pdf4meBackendException as Pdf4meBException,
  Pdf4meClientException as Pdf4meCException
} from "./helper/Pdf4meExceptions";

export type Pdf4meBackendException = Pdf4meBException;
export const Pdf4meBackendException = Pdf4meBException;
export type Pdf4meClientException = Pdf4meCException;
export const Pdf4meClientException = Pdf4meCException;
