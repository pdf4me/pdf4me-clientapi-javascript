import * as request from "request";
import { Stream } from "stream";
import { Pdf4meClient } from "./pdf4meClient";
import { Pdf4meClientException } from "../helper/pdf4meExceptions";
import { CreateImages, CreateImagesRes } from "./../model/image";

export class ImageClient {
  pdf4meClient: Pdf4meClient;

  constructor(pdf4meClient: Pdf4meClient) {
    this.pdf4meClient = pdf4meClient;
  }

  /**
   * The predefined image creation is carried out.
   * @param createImages image creation configuration
   */
  public createImages(createImages: CreateImages) {
    return new Promise<CreateImagesRes>((resolve, reject) => {
      // check createImages validity
      const checkRes = this.checkCreateImagesObjectValidity(createImages);
      if (checkRes) {
        reject(checkRes);
        return;
      }
      this.pdf4meClient.customHttp
        .postJson<CreateImagesRes>("/Image/CreateImages", createImages)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * Produces a thumbnail of the page referenced by the pageNr. Be aware of the one-indexing of the page numbers.
   * @param width size of the produced thumbnail
   * @param pageNr number of the page which should be captured by the thumbnail
   * @param imageFormat picture format of thumbnail, e.g. 'jpg'
   * @param file file to capture thumbnails from
   */
  public createThumbnail(
    width: number,
    pageNr: string,
    imageFormat: "jpg" | "png" | "bmp",
    file: Stream
  ) {
    return new Promise<Buffer>((resolve, reject) => {
      this.pdf4meClient.customHttp
        .postFormData<Buffer>("/Image/CreateThumbnail", {
          width: width,
          pageNr: pageNr,
          imageFormat: imageFormat,
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

  /**
   * Produces a thumbnail of the page referenced by the pageNr. Be aware of the one-indexing of the page numbers.
   * @param width size of the produced thumbnail
   * @param pageNr number of the page which should be captured by the thumbnail
   * @param imageFormat picture format of thumbnail, e.g. 'jpg'
   * @param file file to capture thumbnails from
   */

  public createThumbnails(
    width: number,
    pageNrs: string,
    imageFormat: string,
    file: Stream
  ) {
    return new Promise<Array<Buffer>>((resolve, reject) => {
      this.pdf4meClient.customHttp
        .postFormData<Buffer>("/Image/CreateThumbnails", {
          width,
          pageNrs,
          imageFormat,
          file
        })
        .then(response => {
          const jsonResponse = JSON.parse(response.toString("utf-8"));
          var pdfs: Buffer[] = [];
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

  private checkCreateImagesObjectValidity(createImages: CreateImages) {
    if (createImages == undefined) {
      return new Pdf4meClientException(
        "The createImages parameter cannot be undefined."
      );
    } else if (
      createImages.document == undefined ||
      createImages.document.docData == undefined
    ) {
      return new Pdf4meClientException(
        "The createImages document cannot be undefined nor can the document.docData."
      );
    } else if (createImages.imageAction == undefined) {
      return new Pdf4meClientException("The imageAction cannot be undefined.");
    } else if (createImages.imageAction.pageSelection == undefined) {
      return new Pdf4meClientException(
        "The pageSelection of the imageAction cannot be undefined."
      );
    }
    return null;
  }
}
