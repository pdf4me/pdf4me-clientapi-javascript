import { readFileSync } from "fs";
import { Pdf4meClient } from "../src";

export class Pdf4meTestSetup {
  private pdf4meClient: Pdf4meClient;

  constructor() {
    const token = process.env.PDF4ME_API_TOKEN || "";
    this.pdf4meClient = new Pdf4meClient(token);
  }

  getPdf4meClient() {
    return this.pdf4meClient;
  }
}
