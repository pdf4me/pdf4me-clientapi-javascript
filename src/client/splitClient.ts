import { Stream } from "stream";
import { Pdf4meClient } from "./pdf4meClient";
import { Pdf4meClientException } from "../helper/Pdf4meExceptions";
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
  public split(split: Split): Promise<SplitRes> {
    // check extract validity
    this.checkSplitObjectValidity(split);

    return this.pdf4meClient.customHttp.httpCustomUniversalFunctionPost(
      "/Split/Split",
      split
    ) as any;
  }

  /**
   * Splits the PDF after the pageNr, this results in two smaller PDF documents.
   * @param pageNr determines after which page the split takes place
   * @param file to split into two
   */
  public splitByPageNr(pageNr: number, file: Stream): Promise<Array<Buffer>> {
    return this.pdf4meClient.customHttp
      .httpCustomWrapperPost("/Split/SplitByPageNr", {
        pageNr,
        file
      })
      .then(function(response) {
        return new Promise<Array<Buffer>>(function(resolve, reject) {
          let jsonResponse = JSON.parse(response.toString("utf-8"));
          let pdf1 = new Buffer(jsonResponse[0], "base64");
          let pdf2 = new Buffer(jsonResponse[1], "base64");

          let pdfs = [pdf1, pdf2];

          resolve(pdfs);
        });
      });
  }

  /**
   * Splits the PDF after the pageNr recurringly, this results in a list of smaller PDF documents, each with page count pageNr.
   * @param pageNr determines after which page the split takes place
   * @param file file to split recurringly
   */
  public splitRecurring(pageNr: number, file: Stream): Promise<Array<Buffer>> {
    return this.pdf4meClient.customHttp
      .httpCustomWrapperPost("/Split/SplitRecurring", {
        pageNr: pageNr,
        file: file
      })
      .then(function(response) {
        return new Promise<Array<Buffer>>(function(resolve, reject) {
          let jsonResponse = JSON.parse(response.toString("utf-8"));
          let pdfs: Buffer[] = [];

          jsonResponse.forEach((element: string) => {
            pdfs.push(new Buffer(element, "base64"));
          });

          resolve(pdfs);
        });
      });
  }

  /**
     * Checks whether the split object contains the essential information to be
        processed by the server.
     * @param split object to be checked (validity)
     */
  private checkSplitObjectValidity(split: Split) {
    if (split == undefined) {
      throw new Pdf4meClientException(
        "The split parameter cannot be undefined."
      );
    } else if (
      split.document == undefined ||
      split.document.docData == undefined
    ) {
      throw new Pdf4meClientException(
        "The split document cannot be undefined nor can the document.docData."
      );
    } else if (split.splitAction == undefined) {
      throw new Pdf4meClientException("The splitAction cannot be undefined.");
    } else if (
      split.splitAction.splitAfterPage == undefined ||
      split.splitAction.splitAfterPage == 0
    ) {
      throw new Pdf4meClientException(
        "The splitAfterPage of splitAction cannot be undefined or zero." +
          "The first page of a PDF corresponds to page number one."
      );
    }
  }
}
