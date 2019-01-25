import { readFileSync } from "fs";
import { Pdf4meClient } from "../src";

export class Pdf4meTestSetup {
  private pdf4meClient: Pdf4meClient;

  constructor() {
    let token =
      process.env.PDF4ME_API_TOKEN ||
      "YjQ3MDZkYzUtODMzNy00NjkyLWI3MzYtOGViMTMxNzI2ZjI2OnVHb1MwVEQ4dEFheFVCbUtMQ0J2amR0WkUzc1JGTUtp";
    this.pdf4meClient = new Pdf4meClient(token);
  }

  getPdf4meClient() {
    return this.pdf4meClient;
  }
}
