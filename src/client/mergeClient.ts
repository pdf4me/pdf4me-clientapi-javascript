import { Stream } from "stream";
import { Pdf4meClient } from "./pdf4meClient";
import { Pdf4meClientException } from "../helper/pdf4meExceptions";
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
  public merge(merge: Merge) {
    return new Promise<MergeRes>((resolve, reject) => {
      // check extract validity
      const checkRes = this.checkMergeObjectValidity(merge);
      if (checkRes) {
        reject(checkRes);
        return;
      }
      this.pdf4meClient.customHttp
        .postJson<MergeRes>("/Merge/Merge", merge)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * Merges the two provided PDF files.
   * @param file1 first PDF
   * @param file2 second PDF
   */
  public merge2Pdfs(file1: Stream, file2: Stream) {
    return new Promise<Buffer>((resolve, reject) => {
      this.pdf4meClient.customHttp
        .postFormData<Buffer>("/Merge/Merge2Pdfs  ", {
          file1,
          file2
        })
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  private checkMergeObjectValidity(merge: Merge) {
    if (merge == undefined) {
      return new Pdf4meClientException(
        "The merge parameter cannot be undefined."
      );
    } else if (merge.documents == undefined) {
      return new Pdf4meClientException(
        "The merge documents cannot be undefined."
      );
    } else if (merge.mergeAction == undefined) {
      return new Pdf4meClientException("The mergeAction cannot be undefined.");
    }

    // check whether there are at least two documents
    let numDocs = (merge.documents as Array<Document>).length;
    if (numDocs < 2) {
      return new Pdf4meClientException(
        "The merge documents must contain at least two documents."
      );
    }
    // check whether all documents are not undefined neither is their docData
    let i;
    for (i = 0; i < numDocs; i++) {
      let currentDoc = (merge.documents as Array<Document>)[i];
      if (currentDoc == undefined || currentDoc.docData == undefined) {
        return new Pdf4meClientException(
          "The merge documents cannot be undefined nor can the document.docData."
        );
      }
    }
  }
}
