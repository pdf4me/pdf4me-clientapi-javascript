import { Stream } from "stream";
import { Pdf4meClient } from "./pdf4meClient";
import { Pdf4meClientException } from "../helper/pdf4meExceptions";
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
  public pdfA(createPdfA: CreatePdfA) {
    return new Promise<CreatePdfARes>((resolve, reject) => {
      // check createPdfA validity
      const checkRes = this.checkCreatePdfAObjectValidity(createPdfA);
      if (checkRes) {
        reject(checkRes);
        return;
      }

      this.pdf4meClient.customHttp
        .postJson<CreatePdfARes>("/PdfA/PdfA", createPdfA)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * Converts PDF documents to the PDF/A format for long-term archiving.
   * @param pdfCompliance PDF/A compliance level
   * @param file to be converted to PDF/A
   */
  public createPdfA(pdfCompliance: string, file: Stream): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
      this.pdf4meClient.customHttp
        .postFormData<Buffer>("/PdfA/CreatePdfA", {
          pdfCompliance: pdfCompliance,
          file: file
        })
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  private checkCreatePdfAObjectValidity(createPdfA: CreatePdfA) {
    if (createPdfA == undefined) {
      return new Pdf4meClientException(
        "The createPdfA parameter cannot be undefined."
      );
    } else if (
      createPdfA.document == undefined ||
      createPdfA.document.docData == undefined
    ) {
      return new Pdf4meClientException(
        "The createPdfA document cannot be undefined nor can the document.docData."
      );
    } else if (createPdfA.pdfAAction == undefined) {
      return new Pdf4meClientException("The pdfAAction cannot be undefined.");
    }
  }
}
