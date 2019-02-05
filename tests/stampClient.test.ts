import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import { StampClient, Pdf4meClientException, Stamp } from "../src";
import { Pdf4meTestSetup } from "./pdf4meTestSetup";
import testFiles from "./testfiles";
const expect = chai.expect;
chai.use(chaiAsPromised);

const pdf4meClient = new Pdf4meTestSetup().getPdf4meClient();
const stampClient = new StampClient(pdf4meClient);

function createStamp(): Stamp {
  return {
    document: { docData: testFiles.getBase64FileContent(testFiles.files.pdf1) },
    stampAction: {
      text: { value: "EXAMPLE TEXT" },
      alpha: 1.0,
      pageSequence: "all",
      alignX: "center",
      alignY: "middle"
    }
  };
}

describe("Stamp Client", () => {
  describe("Stamp Object: Validity Check", () => {
    it("Stamp (not undefined): Pdf4meClientException.", async () => {
      expect(stampClient.stamp(undefined as any)).to.be.rejectedWith(
        Pdf4meClientException,
        "The stamp parameter cannot be undefined."
      );
    });

    it("Document (not undefined): Pdf4meClientException.", async () => {
      const stamp = createStamp();
      stamp.document = undefined as any;
      expect(stampClient.stamp(stamp)).to.be.rejectedWith(
        Pdf4meClientException,
        "The stamp document cannot be undefined nor can the document.docData."
      );
    });

    it("Document.docData (not undefined): Pdf4meClientException.", async () => {
      const stamp = createStamp();
      stamp.document.docData = undefined as any;
      expect(stampClient.stamp(stamp)).to.be.rejectedWith(
        Pdf4meClientException,
        "The stamp document cannot be undefined nor can the document.docData."
      );
    });

    it("StampAction (not undefined): Pdf4meClientException.", async () => {
      const stamp = createStamp();
      stamp.stampAction = undefined as any;
      expect(stampClient.stamp(stamp)).to.be.rejectedWith(
        Pdf4meClientException,
        "The stampAction cannot be undefined."
      );
    });

    it("StampAction.alpha (not undefined): Pdf4meClientException.", async () => {
      const stamp = createStamp();
      stamp.stampAction.alpha = undefined as any;
      expect(stampClient.stamp(stamp)).to.be.rejectedWith(
        Pdf4meClientException,
        "The alpha parameter of stampAction cannot be undefined."
      );
    });

    it("StampAction.image & StampAction.text (not both undefined): Pdf4meClientException.", async () => {
      const stamp = createStamp();
      stamp.stampAction.image = undefined as any;
      stamp.stampAction.text = undefined as any;
      expect(stampClient.stamp(stamp)).to.be.rejectedWith(
        Pdf4meClientException,
        "The image and text parameter of stampAction cannot both be undefined."
      );
    });
  });

  /* ----------------split--------------------------*/
  describe("method: stamp ", () => {
    it("Response is not rejected.", async () => {
      return expect(stampClient.stamp(createStamp())).to.not.be.rejected;
    });

    it("Returns pdf.", async () => {
      const result = await stampClient.stamp(createStamp());
      expect(result).to.not.be.null;
    });
  });

  /* ----------------splitByPageNr--------------------------*/
  describe("method: textStamp ", () => {
    it("Response is not rejected.", () => {
      return expect(
        stampClient.textStamp(
          "EXAMPLE TEXT",
          "all",
          "center",
          "middle",
          testFiles.getReadStream(testFiles.files.pdf1)
        )
      ).to.not.be.rejected;
    });

    it("Returns pdf.", async () => {
      const result = await stampClient.textStamp(
        "EXAMPLE TEXT",
        "all",
        "center",
        "middle",
        testFiles.getReadStream(testFiles.files.pdf1)
      );
      expect(result).to.not.be.null;
      expect(result.length).to.not.be.lessThan(10);
    });
  });
});
