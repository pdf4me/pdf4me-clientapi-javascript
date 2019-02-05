import { Stream } from "stream";
import { Pdf4meClient } from "./pdf4meClient";
import { Pdf4meClientException } from "../helper/pdf4meExceptions";
import { Stamp, StampRes } from "../model/stamp";

export class StampClient {
  pdf4meClient: Pdf4meClient;

  constructor(pdf4meClient: Pdf4meClient) {
    this.pdf4meClient = pdf4meClient;
  }

  /**
   * The predefined stamp is carried out.
   * @param stamp stamp configuration
   */
  public stamp(stamp: Stamp) {
    return new Promise<StampRes>((resolve, reject) => {
      // check extract validity
      const checkRes = this.checkStampObjectValidity(stamp);
      if (checkRes) {
        reject(checkRes);
        return;
      }
      this.pdf4meClient.customHttp
        .postJson<StampRes>("/Stamp/Stamp", stamp)

        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * Places a custom text stamp on the pages of your choice. The position of the stamp is specified by alignX and alignY.
   * @param text custom text on stamp
   * @param pages pages to be stamped
   * @param alignX horizontal position
   * @param alignY vertical position
   * @param file to be stamped
   */
  public textStamp(
    text: string,
    pages: string,
    alignX: string,
    alignY: string,
    file: Stream
  ): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
      this.pdf4meClient.customHttp
        .postFormData<Buffer>("/Stamp/TextStamp", {
          text,
          pages,
          alignX,
          alignY,
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

  private checkStampObjectValidity(stamp: Stamp) {
    if (stamp == undefined) {
      return new Pdf4meClientException(
        "The stamp parameter cannot be undefined."
      );
    } else if (
      stamp.document == undefined ||
      stamp.document.docData == undefined
    ) {
      return new Pdf4meClientException(
        "The stamp document cannot be undefined nor can the document.docData."
      );
    } else if (stamp.stampAction == undefined) {
      return new Pdf4meClientException("The stampAction cannot be undefined.");
    } else if (stamp.stampAction.alpha == undefined) {
      return new Pdf4meClientException(
        "The alpha parameter of stampAction cannot be undefined."
      );
    } else if (
      stamp.stampAction.image == undefined &&
      stamp.stampAction.text == undefined
    ) {
      return new Pdf4meClientException(
        "The image and text parameter of stampAction cannot both be undefined."
      );
    }
  }
}
