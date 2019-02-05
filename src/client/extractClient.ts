import { Stream } from "stream";
import { Pdf4meClient } from "./pdf4meClient";
import { Pdf4meClientException } from "../helper/pdf4meExceptions";
import { Extract, ExtractRes } from "./../model/extract";

export class ExtractClient {
  pdf4meClient: Pdf4meClient;

  constructor(pdf4meClient: Pdf4meClient) {
    this.pdf4meClient = pdf4meClient;
  }

  /**
   * The predefined extraction is carried out.
   * @param extract extract configuration
   */
  public extract(extract: Extract) {
    return new Promise<ExtractRes>((resolve, reject) => {
      // check extract validity
      const checkRes = this.checkExtractObjectValidity(extract);
      if (checkRes) {
        reject(checkRes);
        return;
      }
      this.pdf4meClient.customHttp
        .postJson<ExtractRes>("/Extract/Extract", extract)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * The chosen pages will be extracted from the given PDF and form a new PDF. Returns bytes of resulting file, can be directly written to file on disk.
   * @param file to extract the pages from
   * @param pageNrs the page numbers which will be extracted, number 1 corresponds to the first page.
   */
  public extractPages(pageNrs: string, file: Stream) {
    return new Promise<Buffer>((resolve, reject) => {
      this.pdf4meClient.customHttp
        .postFormData<Buffer>("/Extract/ExtractPages", {
          pageNrs,
          file
        })
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  private checkExtractObjectValidity(extract: Extract) {
    if (extract == undefined) {
      return new Pdf4meClientException(
        "The extract parameter cannot be undefined."
      );
    } else if (
      extract.document == undefined ||
      extract.document.docData == undefined
    ) {
      return new Pdf4meClientException(
        "The extract document cannot be undefined nor can the document.docData."
      );
    } else if (extract.extractAction == undefined) {
      return new Pdf4meClientException(
        "The ExtractAction cannot be undefined."
      );
    } else if (extract.extractAction.extractPages == undefined) {
      return new Pdf4meClientException(
        "The extractPages of ExtractAction cannot be undefined."
      );
    } else if (typeof extract.extractAction.extractPages == "number") {
      if (extract.extractAction.extractPages == 0) {
        return new Pdf4meClientException(
          "The extractPages of ExtractAction cannot be zero."
        );
      }
    } else if (extract.extractAction.extractPages instanceof Array) {
      if (extract.extractAction.extractPages.length == 0) {
        return new Pdf4meClientException(
          "The extractPages of ExtractAction cannot be empty."
        );
      }
    }
  }
}
