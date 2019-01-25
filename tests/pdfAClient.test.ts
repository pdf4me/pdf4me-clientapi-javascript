import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import { PdfAClient, CreatePdfA, Pdf4meClientException } from "../src";
import { Pdf4meTestSetup } from "./pdf4meTestSetup";
import testFiles from "./testfiles";
const expect = chai.expect;
chai.use(chaiAsPromised);

const pdf4meClient = new Pdf4meTestSetup().getPdf4meClient();
const pdfAClient = new PdfAClient(pdf4meClient);

const createCreatePdfA = (): CreatePdfA => {
  return {
    document: { docData: testFiles.getBase64FileContent(testFiles.files.pdf1) },
    pdfAAction: {
      compliance: "pdfA1b"
    }
  };
};

describe.only("PdfA Client", () => {
  /* ----------------pdfA--------------------------*/
  describe("method: pdfA ", () => {
    it("Response is not rejected.", async () => {
      const pdfAReq = createCreatePdfA();
      expect(pdfAClient.pdfA(pdfAReq)).to.not.be.rejected;
    });

    it("Return Pdf", async () => {
      const pdfAReq = createCreatePdfA();
      const pdfARes = await pdfAClient.pdfA(pdfAReq);

      expect(pdfARes).to.be.not.null;
      // expect(pdfARes.documents.length).to.be.equal(2);
      // expect(typeof splitRes.documents[0].docData).to.be.equal("string");
      // expect(typeof splitRes.documents[1].docData).to.be.equal("string");
      // expect(typeof splitRes.documents[0].docData).to.be.not.empty;
      // expect(typeof splitRes.documents[1].docData).to.be.not.empty;
    });
    /*
     */
  });
});
