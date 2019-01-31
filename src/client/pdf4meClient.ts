import CustomHttp from "./../helper/customHttp";
import { Pdf4meClientException } from "./../helper/pdf4meExceptions";

export class Pdf4meClient {
  customHttp: CustomHttp;

  //clientId: string;
  //secret: string;
  apitoken: string;

  // constructor(clientId: string, secret: string) {

  //     this.clientId = clientId;
  //     this.secret = secret;

  //     // in case an invalid clientId or secret is provided - throw an exception
  //     if (this.clientId == '' || this.clientId == undefined || this.secret == '' || this.secret == undefined) {
  //         throw new Pdf4meClientException('Please provide a valid clientId and secret in the Pdf4meClient constructor.')
  //     }
  //     this.customHttp = new CustomHttp(this.clientId, this.secret);
  // }

  constructor(apitoken: string) {
    //this.clientId = clientId;
    //this.secret = secret;
    this.apitoken = apitoken;
    // in case an invalid clientId or secret is provided - throw an exception
    if (
      this.apitoken == "" ||
      this.apitoken == undefined ||
      this.apitoken === null
    ) {
      throw new Pdf4meClientException(
        "Please provide a valid token in the Pdf4meClient constructor."
      );
    }
    //this.customHttp = new CustomHttp(this.clientId, this.secret);
    this.customHttp = new CustomHttp(this.apitoken);
  }
}
