import { Stream } from "stream";
import { Pdf4meClient } from "./pdf4meClient";
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
  public optimize(optimize: Optimize): Promise<OptimizeRes> {
    // check extract validity
    this.checkOptimizeObjectValidity(optimize);

    return this.pdf4meClient.customHttp.httpCustomUniversalFunctionPost(
      "/Optimize/Optimize",
      optimize
    ) as any;
  }

  /**
     * The provided file will be optimized w.r.t the chosen profile. For instance if the profile 'max' has been
        selected, the resulting PDF will be optimized for maximal memory size reduction.
     * @param profile optimization profile (e.g. 'max' for maximal compression)
     * @param file to be optimized
     */
  public optimizeByProfile(profile: string, file: Stream): Promise<Buffer> {
    return this.pdf4meClient.customHttp.httpCustomWrapperPost(
      "/Optimize/OptimizeByProfile",
      { profile: profile, file: file }
    );
  }

  /**
     * Checks whether the optimize object contains the essential information to be
                processed by the server.
     * @param optimize object to be checked (validity)
     */
  private checkOptimizeObjectValidity(optimize: Optimize) {
    if (optimize == undefined) {
      throw new Pdf4meClientException(
        "The optimize parameter cannot be undefined."
      );
    } else if (
      optimize.document == undefined ||
      optimize.document.docData == undefined
    ) {
      throw new Pdf4meClientException(
        "The optimize document cannot be undefined nor can the document.docData."
      );
    } else if (optimize.optimizeAction == undefined) {
      throw new Pdf4meClientException(
        "The optimizeAction cannot be undefined."
      );
    } else if (optimize.optimizeAction.useProfile != true) {
      throw new Pdf4meClientException(
        "The useProfile parameter of optimizeAction has to be set to true."
      );
    }
  }
}
