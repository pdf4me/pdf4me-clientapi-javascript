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
  public extract(extract: Extract): Promise<ExtractRes> {
    // check extract validity
    this.checkExtractObjectValidity(extract);

    return this.pdf4meClient.customHttp.httpCustomUniversalFunctionPost(
      "/Extract/Extract",
      extract
    ) as any;
  }

  /*
   * The chosen pages will be extracted from the given PDF and form a new PDF. Returns bytes of resulting file, can be directly written to file on disk.
   * @param file to extract the pages from
   * @param pageNrs the page numbers which will be extracted, number 1 corresponds to the first page.
   */
  public extractPages(pageNrs: string, file: Stream): Promise<Buffer> {
    return this.pdf4meClient.customHttp.httpCustomWrapperPost(
      "/Extract/ExtractPages",
      { pageNrs: pageNrs, file: file }
    );
  }

  /**
   * Checks whether the extract object contains the essential information to be processed by the server.
   * @param extract object to be checked (validity)
   */
  private checkExtractObjectValidity(extract: Extract) {
    if (extract == undefined) {
      throw new Pdf4meClientException(
        "The extract parameter cannot be undefined."
      );
    } else if (
      extract.document == undefined ||
      extract.document.docData == undefined
    ) {
      throw new Pdf4meClientException(
        "The extract document cannot be undefined nor can the document.docData."
      );
    } else if (extract.extractAction == undefined) {
      throw new Pdf4meClientException("The ExtractAction cannot be undefined.");
    } else if (extract.extractAction.extractPages == undefined) {
      throw new Pdf4meClientException(
        "The extractPages of ExtractAction cannot be undefined."
      );
    } else if (typeof extract.extractAction.extractPages == "number") {
      if (extract.extractAction.extractPages == 0) {
        throw new Pdf4meClientException(
          "The extractPages of ExtractAction cannot be zero."
        );
      }
    } else if (extract.extractAction.extractPages instanceof Array) {
      if (extract.extractAction.extractPages.length == 0) {
        throw new Pdf4meClientException(
          "The extractPages of ExtractAction cannot be empty."
        );
      }
    }
  }
}
