import { readFileSync } from "fs";
import { Pdf4meClient } from "../src";

export class Pdf4meTestSetup {
  private pdf4meClient: Pdf4meClient;

  constructor() {
    let token = process.env.PDF4ME_API_TOKEN || "123456789";
    console.log("*****************************");
    console.log("start test");
    console.log("token: " + token.substr(0, 8) + "**********");
    console.log("*****************************");
    this.pdf4meClient = new Pdf4meClient(token);
  }

  getPdf4meClient() {
    return this.pdf4meClient;
  }
}
