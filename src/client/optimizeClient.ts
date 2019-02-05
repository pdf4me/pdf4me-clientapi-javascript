import { Stream } from "stream";
import { Pdf4meClient, FileInfo } from "./pdf4meClient";
import { Pdf4meClientException } from "../helper/pdf4meExceptions";
import { Optimize, OptimizeRes } from "./../model/optimize";

export class OptimizeClient {
  pdf4meClient: Pdf4meClient;

  constructor(pdf4meClient: Pdf4meClient) {
    this.pdf4meClient = pdf4meClient;
  }

  /**
   * The predefined optimization is carried out.
   * @param optimize optimization configuration
   */
  public optimize(optimize: Optimize) {
    return new Promise<OptimizeRes>((resolve, reject) => {
      // check extract validity
      const checkRes = this.checkOptimizeObjectValidity(optimize);
      if (checkRes) {
        reject(checkRes);
        return;
      }
      this.pdf4meClient.customHttp
        .postJson<OptimizeRes>("/Optimize/Optimize", optimize)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
     * The provided file will be optimized w.r.t the chosen profile. For instance if the profile 'max' has been
        selected, the resulting PDF will be optimized for maximal memory size reduction.
     * @param profile optimization profile (e.g. 'max' for maximal compression)
     * @param file to be optimized
     */
  public optimizeByProfile(
    profile: string,
    file: Stream | FileInfo
  ): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
      this.pdf4meClient.customHttp
        .postFormData<Buffer>("/Optimize/OptimizeByProfile", {
          profile,
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

  private checkOptimizeObjectValidity(optimize: Optimize) {
    if (optimize == undefined) {
      return new Pdf4meClientException(
        "The optimize parameter cannot be undefined."
      );
    } else if (
      optimize.document == undefined ||
      optimize.document.docData == undefined
    ) {
      return new Pdf4meClientException(
        "The optimize document cannot be undefined nor can the document.docData."
      );
    } else if (optimize.optimizeAction == undefined) {
      return new Pdf4meClientException(
        "The optimizeAction cannot be undefined."
      );
    } else if (optimize.optimizeAction.useProfile != true) {
      return new Pdf4meClientException(
        "The useProfile parameter of optimizeAction has to be set to true."
      );
    }
  }
}
