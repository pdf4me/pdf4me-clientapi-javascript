import { Stream } from "stream";
import { Pdf4meClient } from "../client/pdf4meClient";
import { Pdf4meClientException } from "../helper/Pdf4meExceptions";
import { CreatePdfA, CreatePdfARes } from "./../model/pdfA";

export class PdfAClient {
  pdf4meClient: Pdf4meClient;

  constructor(pdf4meClient: Pdf4meClient) {
    this.pdf4meClient = pdf4meClient;
  }

  /**
   * The predefined PDF/A creation is carried out.
   * @param createPdfA PDF/A configuration
   */
  public pdfA(createPdfA: CreatePdfA): Promise<CreatePdfARes> {
    // check createPdfA validity
    this.checkCreatePdfAObjectValidity(createPdfA);

    return this.pdf4meClient.customHttp.httpCustomUniversalFunctionPost(
      "/PdfA/PdfA",
      createPdfA
    ) as any;
  }

  /**
   * Converts PDF documents to the PDF/A format for long-term archiving.
   * @param pdfCompliance PDF/A compliance level
   * @param file to be converted to PDF/A
   */
  public createPdfA(pdfCompliance: string, file: Stream): Promise<Buffer> {
    return this.pdf4meClient.customHttp.httpCustomWrapperPost(
      "/PdfA/CreatePdfA",
      { pdfCompliance: pdfCompliance, file: file }
    );
  }

  /**
     * checks whether the createPdfA object contains the essential information to be
        processed by the server.
     * @param createPdfA object to be checked (validity)
     */
  private checkCreatePdfAObjectValidity(createPdfA: CreatePdfA) {
    if (createPdfA == undefined) {
      throw new Pdf4meClientException(
        "The createPdfA parameter cannot be undefined."
      );
    } else if (
      createPdfA.document == undefined ||
      createPdfA.document.docData == undefined
    ) {
      throw new Pdf4meClientException(
        "The createPdfA document cannot be undefined nor can the document.docData."
      );
    } else if (createPdfA.pdfAAction == undefined) {
      throw new Pdf4meClientException("The pdfAAction cannot be undefined.");
    }
  }
}
