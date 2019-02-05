import { Stream } from "stream";
import { Pdf4meClient } from "./pdf4meClient";
import { Pdf4meClientException } from "../helper/pdf4meExceptions";
import { Split, SplitRes } from "./../model/split";

export class SplitClient {
  pdf4meClient: Pdf4meClient;

  constructor(pdf4meClient: Pdf4meClient) {
    this.pdf4meClient = pdf4meClient;
  }

  /**
   * The predefined split is carried out.
   * @param split split configuration
   */
  public split(split: Split) {
    return new Promise<SplitRes>((resolve, reject) => {
      // check extract validity
      const checkRes = this.checkSplitObjectValidity(split);
      if (checkRes) {
        reject(checkRes);
        return;
      }
      this.pdf4meClient.customHttp
        .postJson<SplitRes>("/Split/Split", split)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * Splits the PDF after the pageNr, this results in two smaller PDF documents.
   * @param pageNr determines after which page the split takes place
   * @param file to split into two
   */
  public splitByPageNr(pageNr: number, file: Stream) {
    return new Promise<Array<Buffer>>((resolve, reject) => {
      return this.pdf4meClient.customHttp
        .postFormData<Buffer>("/Split/SplitByPageNr", {
          pageNr,
          file
        })
        .then(response => {
          console.log(response.length);
          const jsonResponse = JSON.parse(response.toString("utf-8"));
          const pdf1 = Buffer.from(jsonResponse[0], "base64");
          const pdf2 = Buffer.from(jsonResponse[1], "base64");
          const pdfs = [pdf1, pdf2];
          resolve(pdfs);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * Splits the PDF after the pageNr recurringly, this results in a list of smaller PDF documents, each with page count pageNr.
   * @param pageNr determines after which page the split takes place
   * @param file file to split recurringly
   */
  public splitRecurring(pageNr: number, file: Stream) {
    return new Promise<Array<Buffer>>((resolve, reject) => {
      return this.pdf4meClient.customHttp
        .postFormData<Buffer>("/Split/SplitRecurring", {
          pageNr: pageNr,
          file: file
        })
        .then(function(response) {
          let jsonResponse = JSON.parse(response.toString("utf-8"));
          let pdfs: Buffer[] = [];
          jsonResponse.forEach((element: string) => {
            pdfs.push(Buffer.from(element, "base64"));
          });
          resolve(pdfs);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  private checkSplitObjectValidity(split: Split) {
    if (split == undefined) {
      return new Pdf4meClientException(
        "The split parameter cannot be undefined."
      );
    } else if (
      split.document == undefined ||
      split.document.docData == undefined
    ) {
      return new Pdf4meClientException(
        "The split document cannot be undefined nor can the document.docData."
      );
    } else if (split.splitAction == undefined) {
      return new Pdf4meClientException("The splitAction cannot be undefined.");
    } else if (
      split.splitAction.splitAfterPage == undefined ||
      split.splitAction.splitAfterPage == 0
    ) {
      return new Pdf4meClientException(
        "The splitAfterPage of splitAction cannot be undefined or zero." +
          "The first page of a PDF corresponds to page number one."
      );
    }
  }
}
