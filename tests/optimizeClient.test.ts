import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import { Pdf4meClientException, OptimizeClient, Optimize } from "../src";
import { Pdf4meTestSetup } from "./pdf4meTestSetup";
import testFiles from "./testfiles";
const expect = chai.expect;
chai.use(chaiAsPromised);

const pdf4meClient = new Pdf4meTestSetup().getPdf4meClient();
const optimizeClient = new OptimizeClient(pdf4meClient);

function createOptimize(): Optimize {
  const Optimize: Optimize = {
    document: { docData: testFiles.getBase64FileContent(testFiles.files.pdf1) },
    optimizeAction: { useProfile: true, profile: "max" }
  };
  return Optimize;
}

describe("Optimize Client", () => {
  describe("Optimize Object: Validity Check", () => {
    it("Optimize (not undefined): Pdf4meClientException.", async () => {
      expect(optimizeClient.optimize(undefined as any)).to.be.rejectedWith(
        Pdf4meClientException,
        "The optimize parameter cannot be undefined."
      );
    });

    it("Document (not undefined): Pdf4meClientException.", async () => {
      const optimize = createOptimize();
      optimize.document = undefined as any;
      expect(optimizeClient.optimize(optimize)).to.be.rejectedWith(
        Pdf4meClientException,
        "The optimize document cannot be undefined nor can the document.docData."
      );
    });

    it("Document.docData (not undefined): Pdf4meClientException.", async () => {
      const optimize = createOptimize();
      optimize.document.docData = undefined as any;
      expect(optimizeClient.optimize(optimize)).to.be.rejectedWith(
        Pdf4meClientException,
        "The optimize document cannot be undefined nor can the document.docData."
      );
    });

    it("OptimizeAction (not undefined): Pdf4meClientException.", async () => {
      const optimize = createOptimize();
      optimize.optimizeAction = undefined as any;
      expect(optimizeClient.optimize(optimize)).to.be.rejectedWith(
        Pdf4meClientException,
        "The optimizeAction cannot be undefined."
      );
    });

    it("OptimizeAction.useProfile (must be true): Pdf4meClientException.", async () => {
      const optimize = createOptimize();
      optimize.optimizeAction.useProfile = false;
      expect(optimizeClient.optimize(optimize)).to.be.rejectedWith(
        Pdf4meClientException,
        "The useProfile parameter of optimizeAction has to be set to true."
      );
    });
  });

  /* ----------------optimize--------------------------*/
  describe("method: optimize ", () => {
    it("Response is not rejected.", async () => {
      return expect(optimizeClient.optimize(createOptimize())).to.be.not.be
        .rejected;
    });

    it("The optimized PDF's length is greater than zero and smaller than the original file length.", async () => {
      const result = await optimizeClient.optimize(createOptimize());
      expect(result).to.not.be.null;
    });
  });

  /* ----------------optimizeByProfile--------------------------*/
  describe("method: optimizeByProfile ", () => {
    it("Response is not rejected.", async () => {
      return expect(
        optimizeClient.optimizeByProfile(
          "max",
          testFiles.getReadStream(testFiles.files.pdf1)
        )
      ).to.not.be.rejected;
    });

    it("The optimized PDF's length is greater than zero and smaller than the original file length.", async () => {
      const result = await optimizeClient.optimizeByProfile(
        "max",
        testFiles.getReadStream(testFiles.files.pdf1)
      );
      expect(result).to.not.be.null;
    });
  });
});
