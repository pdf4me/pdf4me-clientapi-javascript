import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import { Pdf4meClientException, ImageClient, CreateImages, Page } from "../src";
import { Pdf4meTestSetup } from "./pdf4meTestSetup";
import testFiles from "./testfiles";
const expect = chai.expect;
chai.use(chaiAsPromised);

const pdf4meClient = new Pdf4meTestSetup().getPdf4meClient();
const imageClient = new ImageClient(pdf4meClient);

function createCreateImages(): CreateImages {
  return {
    document: { docData: testFiles.getBase64FileContent(testFiles.files.pdf1) },
    imageAction: {
      widthPixel: 1000,
      pageSelection: { pageNrs: [1] },
      imageExtension: "jpg"
    }
  } as CreateImages;
}

describe("Image Client", () => {
  describe("CreateImages Object: Validity Check", () => {
    it("CreateImages (not undefined): Pdf4meClientException.", () => {
      expect(() => {
        imageClient.createImages(undefined as any);
      }).to.throw(
        Pdf4meClientException,
        "The createImages parameter cannot be undefined."
      );
    });

    it("Document (not undefined): Pdf4meClientException.", () => {
      let createImages = createCreateImages();
      createImages.document = undefined as any;
      expect(() => {
        imageClient.createImages(createImages);
      }).to.throw(
        Pdf4meClientException,
        "The createImages document cannot be undefined nor can the document.docData."
      );
    });

    it("Document.docData (not undefined): Pdf4meClientException.", () => {
      let createImages = createCreateImages();
      createImages.document.docData = undefined as any;
      expect(() => {
        imageClient.createImages(createImages);
      }).to.throw(
        Pdf4meClientException,
        "The createImages document cannot be undefined nor can the document.docData."
      );
    });

    it("ImageAction (not undefined): Pdf4meClientException.", () => {
      let createImages = createCreateImages();
      createImages.imageAction = undefined as any;
      expect(() => {
        imageClient.createImages(createImages);
      }).to.throw(
        Pdf4meClientException,
        "The imageAction cannot be undefined."
      );
    });

    it("ImageAction.pageSelection (not undefined): Pdf4meClientException.", () => {
      let createImages = createCreateImages();
      createImages.imageAction.pageSelection = undefined;
      expect(() => {
        imageClient.createImages(createImages);
      }).to.throw(
        Pdf4meClientException,
        "The pageSelection of the imageAction cannot be undefined."
      );
    });
  });

  /* ----------------createImages--------------------------*/
  describe("method: createImages ", () => {
    it("Response is not rejected.", async () => {
      expect(imageClient.createImages(createCreateImages())).to.not.be
        .eventually.rejected;
    });

    it("Response contains image", async () => {
      const result = await imageClient.createImages(createCreateImages());
      expect(result).to.not.be.null;
      expect(result.document.pages).to.not.be.null;
      expect((result.document.pages as Page[])[0].thumbnail).to.not.be.null;
    });
  });

  /*-----------------createThumbnail-------------------------*/
  describe("method: createThumbnail ", () => {
    it("Response is not rejected.", async () => {
      expect(
        imageClient.createThumbnail(
          1000,
          "1",
          "jpg",
          testFiles.getReadStream(testFiles.files.pdf1)
        )
      ).to.not.be.eventually.rejected;
    });

    it("Response contains image", async () => {
      const result = await imageClient.createThumbnail(
        1000,
        "1",
        "jpg",
        testFiles.getReadStream(testFiles.files.pdf1)
      );
      expect(result).to.not.be.null;
      expect(result.length).to.be.not.lessThan(10);
    });
  });

  /*-----------------createThumbnails-------------------------*/
  describe("method: createThumbnails ", () => {
    it("Response is not rejected.", async () => {
      expect(
        imageClient.createThumbnails(
          1000,
          "1,3",
          "jpg",
          testFiles.getReadStream(testFiles.files.pdf1)
        )
      ).to.not.be.eventually.rejected;
    });

    it.only("Response contains images", async () => {
      const result = await imageClient.createThumbnails(
        2000,
        "1,3",
        "jpg",
        testFiles.getReadStream(testFiles.files.pdf1)
      );
      expect(result).to.not.be.null;
      expect(result.length).to.be.equal(2);
      expect(result[0].length).to.be.not.lessThan(10);
      expect(result[1].length).to.be.not.lessThan(10);
    });
  });
});
