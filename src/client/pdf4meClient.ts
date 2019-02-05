import CustomHttp from "./../helper/customHttp";
import { Pdf4meClientException } from "./../helper/pdf4meExceptions";

export interface FileInfo {
  data: Buffer;
  contentType?: string;
  fileName?: string;
}

export class Pdf4meClient {
  customHttp: CustomHttp;
  apitoken: string;

  constructor(apitoken: string) {
    this.apitoken = apitoken;
    if (
      this.apitoken == "" ||
      this.apitoken == undefined ||
      this.apitoken === null
    ) {
      throw new Pdf4meClientException(
        "Please provide a valid token in the Pdf4meClient constructor."
      );
    }
    this.customHttp = new CustomHttp(this.apitoken);
  }
}
