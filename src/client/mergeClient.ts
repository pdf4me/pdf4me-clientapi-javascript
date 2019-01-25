import { Stream } from "stream";
import { Pdf4meClient } from "../client/pdf4meClient";
import { Pdf4meClientException } from "../helper/Pdf4meExceptions";
import { Document } from "./../model/model";
import { Merge, MergeRes } from "./../model/merge";

export class MergeClient {
  pdf4meClient: Pdf4meClient;

  constructor(pdf4meClient: Pdf4meClient) {
    this.pdf4meClient = pdf4meClient;
  }

  /**
   * The predefined merge is carried out.
   * @param merge merge configuration
   */
  public merge(merge: Merge): Promise<MergeRes> {
    // check extract validity
    this.checkMergeObjectValidity(merge);

    return this.pdf4meClient.customHttp.httpCustomUniversalFunctionPost(
      "/Merge/Merge",
      merge
    ) as any;
  }

  /**
   * Merges the two provided PDF files.
   * @param file1 first PDF
   * @param file2 second PDF
   */
  public merge2Pdfs(file1: Stream, file2: Stream): Promise<Buffer> {
    return this.pdf4meClient.customHttp.httpCustomWrapperPost(
      "/Merge/Merge2Pdfs  ",
      { file1: file1, file2: file2 }
    );
  }

  /**
     * Checks whether the merge object contains the essential information to be
        processed by the server.
     * @param merge object to be checked (validity)
     */
  private checkMergeObjectValidity(merge: Merge) {
    if (merge == undefined) {
      throw new Pdf4meClientException(
        "The merge parameter cannot be undefined."
      );
    } else if (merge.documents == undefined) {
      throw new Pdf4meClientException(
        "The merge documents cannot be undefined."
      );
    } else if (merge.mergeAction == undefined) {
      throw new Pdf4meClientException("The mergeAction cannot be undefined.");
    }

    // check whether there are at least two documents
    let numDocs = (merge.documents as Array<Document>).length;
    if (numDocs < 2) {
      throw new Pdf4meClientException(
        "The merge documents must contain at least two documents."
      );
    }
    // check whether all documents are not undefined neither is their docData
    let i;
    for (i = 0; i < numDocs; i++) {
      let currentDoc = (merge.documents as Array<Document>)[i];
      if (currentDoc == undefined || currentDoc.docData == undefined) {
        throw new Pdf4meClientException(
          "The merge documents cannot be undefined nor can the document.docData."
        );
      }
    }
  }
}
