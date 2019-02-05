import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import { SplitClient, Pdf4meClientException, Split } from "../src";
import { Pdf4meTestSetup } from "./pdf4meTestSetup";
import testFiles from "./testfiles";
const expect = chai.expect;
chai.use(chaiAsPromised);

const pdf4meClient = new Pdf4meTestSetup().getPdf4meClient();
const splitClient = new SplitClient(pdf4meClient);

const createSplit = (): Split => {
  return {
    document: {
      docData: testFiles.getBase64FileContent(testFiles.files.pdf1)
    },
    splitAction: {
      splitAfterPage: 2
    }
  };
};

const add = (a: number, b: number) => a + b;

describe("Split Client", () => {
  describe("Split Object: Validity Check", () => {
    it("Split (not undefined): Pdf4meClientException.", async () => {
      expect(splitClient.split(undefined as any)).to.be.rejectedWith(
        Pdf4meClientException,
        "The split parameter cannot be undefined."
      );
    });

    it("Document (not undefined): Pdf4meClientException.", async () => {
      const split = createSplit();
      split.document = undefined as any;
      expect(splitClient.split(split)).to.be.rejectedWith(
        Pdf4meClientException,
        "The split document cannot be undefined nor can the document.docData."
      );
    });

    it("Document.docData (not undefined): Pdf4meClientException.", async () => {
      let split = createSplit();
      split.document.docData = undefined as any;
      expect(splitClient.split(split)).to.be.rejectedWith(
        Pdf4meClientException,
        "The split document cannot be undefined nor can the document.docData."
      );
    });

    it("SplitAction (not undefined): Pdf4meClientException.", async () => {
      let split = createSplit();
      split.splitAction = undefined as any;
      expect(splitClient.split(split)).to.be.rejectedWith(
        Pdf4meClientException,
        "The splitAction cannot be undefined."
      );
    });

    it("SplitAction.splitAfterPage (not undefined): Pdf4meClientException.", async () => {
      let split = createSplit();
      split.splitAction.splitAfterPage = undefined as any;
      expect(splitClient.split(split)).to.be.rejectedWith(
        Pdf4meClientException,
        "The splitAfterPage of splitAction cannot be undefined or zero." +
          "The first page of a PDF corresponds to page number one."
      );
    });

    it("SplitAction.splitAfterPage (not zero): Pdf4meClientException.", async () => {
      let split = createSplit();
      split.splitAction.splitAfterPage = 0;
      expect(splitClient.split(split)).to.be.rejectedWith(
        Pdf4meClientException,
        "The splitAfterPage of splitAction cannot be undefined or zero." +
          "The first page of a PDF corresponds to page number one."
      );
    });
  });

  /* ----------------split--------------------------*/
  describe("method: split ", () => {
    it("Response is not rejected.", async () => {
      const splitReq = createSplit();
      expect(splitClient.split(splitReq)).to.not.be.rejected;
    });

    it("Returns two Pdf files", async () => {
      const splitReq = createSplit();
      const splitRes = await splitClient.split(splitReq);

      expect(splitRes).to.be.not.null;
      expect(splitRes.documents.length).to.be.equal(2);
      expect(typeof splitRes.documents[0].docData).to.be.equal("string");
      expect(typeof splitRes.documents[1].docData).to.be.equal("string");
      expect(typeof splitRes.documents[0].docData).to.be.not.empty;
      expect(typeof splitRes.documents[1].docData).to.be.not.empty;
    });
  });

  /* ----------------splitByPageNr--------------------------*/
  describe("method: splitByPageNr ", () => {
    it("Response is not rejected.", async () => {
      const pdfFile = testFiles.getReadStream(testFiles.files.pdf1);
      expect(splitClient.splitByPageNr(2, pdfFile)).to.not.be.rejected;
    });

    it("Returns two Pdf files.", async () => {
      const pdfFile = testFiles.getReadStream(testFiles.files.pdf1);
      const splitByPageNrRes = await splitClient.splitByPageNr(2, pdfFile);
      expect(splitByPageNrRes).to.be.not.null;
      expect(splitByPageNrRes.length).to.be.equal(2);
    });
  });
});
