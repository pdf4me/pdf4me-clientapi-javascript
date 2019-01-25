import { Stream } from "stream";
import { Pdf4meClient } from "../client/pdf4meClient";
import { Pdf4meClientException } from "../helper/Pdf4meExceptions";
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
  public createImages(createImages: CreateImages): Promise<CreateImagesRes> {
    // check createImages validity
    this.checkCreateImagesObjectValidity(createImages);

    return this.pdf4meClient.customHttp.httpCustomUniversalFunctionPost(
      "/Image/CreateImages",
      createImages
    ) as any;
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
    imageFormat: string,
    file: Stream
  ): Promise<Buffer> {
    return this.pdf4meClient.customHttp.httpCustomWrapperPost(
      "/Image/CreateThumbnail",
      { width: width, pageNr: pageNr, imageFormat: imageFormat, file: file }
    );
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
  ): Promise<Array<Buffer>> {
    return this.pdf4meClient.customHttp
      .httpCustomWrapperPost("/Image/CreateThumbnails", {
        width: width,
        pageNrs: pageNrs,
        imageFormat: imageFormat,
        file: file
      })
      .then(function(response) {
        return new Promise<Array<Buffer>>(function(resolve, reject) {
          let jsonResponse = JSON.parse(response.toString("utf-8"));
          var pdfs: Buffer[] = [];

          jsonResponse.forEach((element: string) => {
            pdfs.push(Buffer.from(element, "base64"));
          });

          resolve(pdfs);
        });
      });
  }

  /**
     * Checks whether the createImages object contains the essential information to be
                processed by the server.
     * @param createImages object to be checked (validity)
     */
  private checkCreateImagesObjectValidity(createImages: CreateImages) {
    if (createImages == undefined) {
      throw new Pdf4meClientException(
        "The createImages parameter cannot be undefined."
      );
    } else if (
      createImages.document == undefined ||
      createImages.document.docData == undefined
    ) {
      throw new Pdf4meClientException(
        "The createImages document cannot be undefined nor can the document.docData."
      );
    } else if (createImages.imageAction == undefined) {
      throw new Pdf4meClientException("The imageAction cannot be undefined.");
    } else if (createImages.imageAction.pageSelection == undefined) {
      throw new Pdf4meClientException(
        "The pageSelection of the imageAction cannot be undefined."
      );
    }
  }
}
