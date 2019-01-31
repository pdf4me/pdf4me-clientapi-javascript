import { Stream } from "stream";
import { Pdf4meClient } from "./pdf4meClient";
import { Pdf4meClientException } from "../helper/Pdf4meExceptions";
import { ConvertToPdf, ConvertToPdfRes } from "./../model/convert";

export class ConvertClient {
  pdf4meClient: Pdf4meClient;
  /**
   * Create a ConvertClient.
   * @param {object} pdf4meClient - The pdf4meClient.
   */
  constructor(pdf4meClient: Pdf4meClient) {
    this.pdf4meClient = pdf4meClient;
  }

  /**
   * The predefined convertToPdf is carried out.
   * @param {object} convertToPdf conversion configuration
   * @return {object} ConvertToPdfRes
   */
  public convertToPdf(convertToPdf: ConvertToPdf): Promise<ConvertToPdfRes> {
    // check createPdfA validity
    this.checkConvertToPdfObjectValidity(convertToPdf);

    return this.pdf4meClient.customHttp.httpCustomUniversalFunctionPost(
      "/Convert/ConvertToPdf",
      convertToPdf
    ) as any;
  }

  /**
   * The provided Non-PDF file gets converted to a PDF.
   * @param {Buffer} file to be converted to PDF
   * @param {string} fileName the name of the provided file (including the file extension)
   */
  public convertFileToPdf(fileName: string, file: Stream): Promise<Buffer> {
    return this.pdf4meClient.customHttp.httpCustomWrapperPost(
      "/Convert/ConvertFileToPdf",
      { fName: fileName, file: file }
    );
  }

  private checkConvertToPdfObjectValidity(convertToPdf: ConvertToPdf) {
    if (convertToPdf == undefined) {
      throw new Pdf4meClientException(
        "The convertToPdf parameter cannot be undefined."
      );
    } else if (
      convertToPdf.document == undefined ||
      convertToPdf.document.docData == undefined
    ) {
      throw new Pdf4meClientException(
        "The convertToPdf document cannot be undefined nor can the document.docData."
      );
    } else if (convertToPdf.document.name == undefined) {
      throw new Pdf4meClientException(
        "The name field of convertToPdf's document cannot be undefined (name must incl. file extension)."
      );
    } else if (convertToPdf.convertToPdfAction == undefined) {
      throw new Pdf4meClientException(
        "The convertToPdfAction cannot be undefined."
      );
    }
  }
}
