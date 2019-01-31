import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import { Pdf4meClientException, ExtractClient, Extract } from "../src";
import { Pdf4meTestSetup } from "./pdf4meTestSetup";
import testFiles from "./testfiles";
const expect = chai.expect;
chai.use(chaiAsPromised);

const pdf4meClient = new Pdf4meTestSetup().getPdf4meClient();
const extractClient = new ExtractClient(pdf4meClient);

function createExtract(): Extract {
  return {
    document: {
      docData: testFiles.getBase64FileContent(testFiles.files.pdf1)
    },
    extractAction: {
      extractPages: [1, 4]
    }
  };
}

describe("Extract Client", () => {
  describe("Extract Object: Validity Check", () => {
    it("Extract (not undefined): Pdf4meClientException.", () => {
      expect(() => {
        extractClient.extract(undefined as any);
      }).to.throw(
        Pdf4meClientException,
        "The extract parameter cannot be undefined."
      );
    });

    it("Document (not undefined): Pdf4meClientException.", () => {
      let extract = createExtract();
      extract.document = undefined as any;
      expect(() => {
        extractClient.extract(extract);
      }).to.throw(
        Pdf4meClientException,
        "The extract document cannot be undefined nor can the document.docData."
      );
    });

    it("Document.docData (not undefined): Pdf4meClientException.", () => {
      let extract = createExtract();
      extract.document.docData = undefined as any;
      expect(() => {
        extractClient.extract(extract);
      }).to.throw(
        Pdf4meClientException,
        "The extract document cannot be undefined nor can the document.docData."
      );
    });

    it("ExtractAction (not undefined): Pdf4meClientException.", () => {
      let extract = createExtract();
      extract.extractAction = undefined as any;
      expect(() => {
        extractClient.extract(extract);
      }).to.throw(
        Pdf4meClientException,
        "The ExtractAction cannot be undefined."
      );
    });

    it("ExtractAction.extractPages (not undefined): Pdf4meClientException.", () => {
      let extract = createExtract();
      extract.extractAction.extractPages = undefined as any;
      expect(() => {
        extractClient.extract(extract);
      }).to.throw(
        Pdf4meClientException,
        "The extractPages of ExtractAction cannot be undefined."
      );
    });

    it.skip("ExtractAction.extractPages (not zero): Pdf4meClientException.", () => {
      let extract = createExtract();
      extract.extractAction.extractPages = [-5];
      expect(() => {
        extractClient.extract(extract);
      }).to.throw(
        Pdf4meClientException,
        "The extractPages of ExtractAction cannot be zero."
      );
    });

    it("ExtractAction.extractPages (not empty): Pdf4meClientException.", () => {
      let extract = createExtract();
      extract.extractAction.extractPages = [];
      expect(() => {
        extractClient.extract(extract);
      }).to.throw(
        Pdf4meClientException,
        "The extractPages of ExtractAction cannot be empty."
      );
    });
  });

  /*-----------------extract-------------------------*/
  describe("method: extract", () => {
    it("Response is not rejected.", async () => {
      expect(extractClient.extract(createExtract())).to.not.be.rejected;
    });

    it("Response contains pdf", async () => {
      const result = await extractClient.extract(createExtract());

      expect(result).to.not.be.null;
      expect(result.document).to.not.be.null;
      expect(result.document.docData).to.not.be.null;
      expect((result.document.docData as string).length).to.not.be.lessThan(10);
    });
  });

  /*-----------------extractPages-------------------------*/
  describe("method: extractPages", () => {
    it("Response is not rejected.", async () => {
      expect(
        extractClient.extractPages(
          "1,4",
          testFiles.getReadStream(testFiles.files.pdf1)
        )
      ).to.not.be.rejected;
    });

    it("Response contains pdf", async () => {
      const result = await extractClient.extractPages(
        "1,4",
        testFiles.getReadStream(testFiles.files.pdf1)
      );
      expect(result).to.not.be.null;
      expect(result.length).to.not.be.lessThan(10);
    });
  });
});
