import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import { Pdf4meClientException, MergeClient, Merge } from "../src";
import { Pdf4meTestSetup } from "./pdf4meTestSetup";
import testFiles from "./testfiles";
const expect = chai.expect;
chai.use(chaiAsPromised);

const pdf4meClient = new Pdf4meTestSetup().getPdf4meClient();
const mergeClient = new MergeClient(pdf4meClient);

function createMerge(): Merge {
  return {
    documents: [
      { docData: testFiles.getBase64FileContent(testFiles.files.pdf1) },
      { docData: testFiles.getBase64FileContent(testFiles.files.pdf2) }
    ],
    mergeAction: {}
  };
}

describe("Merge Client", () => {
  describe("Merge Object: Validity Check", () => {
    it("Merge (not undefined): Pdf4meClientException.", async () => {
      expect(mergeClient.merge(undefined as any)).to.be.rejectedWith(
        Pdf4meClientException,
        "The merge parameter cannot be undefined."
      );
    });

    it("Documents (not undefined): Pdf4meClientException.", async () => {
      const merge = createMerge();
      merge.documents = undefined as any;
      expect(mergeClient.merge(merge)).to.be.rejectedWith(
        Pdf4meClientException,
        "The merge documents cannot be undefined."
      );
    });

    it("Documents (not two documents): Pdf4meClientException.", async () => {
      const merge = createMerge();
      merge.documents = [{ docData: undefined as any }];
      expect(mergeClient.merge(merge)).to.be.rejectedWith(
        Pdf4meClientException,
        "The merge documents must contain at least two documents."
      );
    });

    it("Documents[0] (not undefined): Pdf4meClientException.", async () => {
      const merge = createMerge();
      merge.documents[0] = undefined as any;
      expect(mergeClient.merge(merge)).to.be.rejectedWith(
        Pdf4meClientException,
        "The merge documents cannot be undefined nor can the document.docData."
      );
    });

    it("Documents[1] (not undefined): Pdf4meClientException.", async () => {
      const merge = createMerge();
      merge.documents[1] = undefined as any;
      expect(mergeClient.merge(merge)).to.be.rejectedWith(
        Pdf4meClientException,
        "The merge documents cannot be undefined nor can the document.docData."
      );
    });

    it("Documents[0].docData (not undefined): Pdf4meClientException.", async () => {
      const merge = createMerge();
      merge.documents[0].docData = undefined as any;
      expect(mergeClient.merge(merge)).to.be.rejectedWith(
        Pdf4meClientException,
        "The merge documents cannot be undefined nor can the document.docData."
      );
    });

    it("Documents[1].docData (not undefined): Pdf4meClientException.", async () => {
      const merge = createMerge();
      merge.documents[1].docData = undefined as any;
      expect(mergeClient.merge(merge)).to.be.rejectedWith(
        Pdf4meClientException,
        "The merge documents cannot be undefined nor can the document.docData."
      );
    });

    it("MergeAction (not undefined): Pdf4meClientException.", async () => {
      const merge = createMerge();
      merge.mergeAction = undefined as any;
      expect(mergeClient.merge(merge)).to.be.rejectedWith(
        Pdf4meClientException,
        "The mergeAction cannot be undefined."
      );
    });
  });

  /*-----------------merge-------------------------*/
  describe("method: merge ", () => {
    it("Response is not rejected.", async () => {
      return expect(mergeClient.merge(createMerge())).to.not.be.rejected;
    });

    it("Returns pdf document", async () => {
      const result = await mergeClient.merge(createMerge());
      expect(result).to.not.be.null;
      expect(result.document).to.not.be.null;
      expect(result.document.docData).to.not.be.null;
      expect((result.document.docData as string).length).to.not.be.lessThan(10);
    });
  });

  /*-----------------merge2Pdfs-------------------------*/
  describe("method: merge2Pdfs ", () => {
    it("Response is not rejected.", async () => {
      return expect(
        mergeClient.merge2Pdfs(
          testFiles.getReadStream(testFiles.files.pdf1),
          testFiles.getReadStream(testFiles.files.pdf2)
        )
      ).to.not.be.rejected;
    });

    it("Returns pdf document", async () => {
      const result = await mergeClient.merge2Pdfs(
        testFiles.getReadStream(testFiles.files.pdf1),
        testFiles.getReadStream(testFiles.files.pdf2)
      );
      expect(result).to.not.be.null;
      expect(result.length).to.not.be.lessThan(10);
    });
  });
});
