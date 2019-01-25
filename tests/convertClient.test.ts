import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import { ConvertClient, Pdf4meClientException, ConvertToPdf } from "../src";
import { Pdf4meTestSetup } from "./pdf4meTestSetup";
import testFiles from "./testfiles";
const expect = chai.expect;
chai.use(chaiAsPromised);

const pdf4meClient = new Pdf4meTestSetup().getPdf4meClient();
const convertClient = new ConvertClient(pdf4meClient);

function createConvertToPdf(name: string): ConvertToPdf {
  return {
    document: {
      docData: testFiles.getBase64FileContent(name),
      name: name
    },
    convertToPdfAction: {}
  };
}

describe("Convert Client", () => {
  describe("ConvertToPdf Object: Validity Check", () => {
    it("ConvertToPdf (not undefined): Pdf4meClientException.", () => {
      expect(() => {
        convertClient.convertToPdf(undefined as any);
      }).to.throw(
        Pdf4meClientException,
        "The convertToPdf parameter cannot be undefined."
      );
    });

    it("Document (not undefined): Pdf4meClientException.", () => {
      const convertToPdfReq = createConvertToPdf(testFiles.files.pdf1);
      convertToPdfReq.document = undefined as any;
      expect(() => {
        convertClient.convertToPdf(convertToPdfReq);
      }).to.throw(
        Pdf4meClientException,
        "The convertToPdf document cannot be undefined nor can the document.docData."
      );
    });

    it("Document.docData (not undefined): Pdf4meClientException.", () => {
      const convertToPdfReq = createConvertToPdf(testFiles.files.text);
      convertToPdfReq.document.docData = undefined as any;
      expect(() => {
        convertClient.convertToPdf(convertToPdfReq);
      }).to.throw(
        Pdf4meClientException,
        "The convertToPdf document cannot be undefined nor can the document.docData."
      );
    });

    it("Document.name (not undefined): Pdf4meClientException.", () => {
      const convertToPdfReq = createConvertToPdf(testFiles.files.text);
      convertToPdfReq.document.name = undefined as any;
      expect(() => {
        convertClient.convertToPdf(convertToPdfReq);
      }).to.throw(
        Pdf4meClientException,
        "The name field of convertToPdf's document cannot be undefined (name must incl. file extension)."
      );
    });

    it("ConvertToPdfAction (not undefined): Pdf4meClientException.", () => {
      const convertToPdfReq = createConvertToPdf(testFiles.files.text);
      convertToPdfReq.convertToPdfAction = undefined as any;
      expect(() => {
        convertClient.convertToPdf(convertToPdfReq);
      }).to.throw(
        Pdf4meClientException,
        "The convertToPdfAction cannot be undefined."
      );
    });
  });

  /*-----------------convertToPdf-------------------------*/
  describe("method: convertToPdf ", () => {
    // .txt file
    it(".txt file: Response is not rejected.", async () => {
      const convertToPdfReq = createConvertToPdf(testFiles.files.text);
      expect(convertClient.convertToPdf(convertToPdfReq)).to.not.be.rejected;
    });

    /*
    it(".txt file: PDF document length is greater than the original's file length.", () => {
      let value = convertClient
        .convertToPdf(
          createConvertToPdf(testFiles.textData, testFiles.textName)
        )
        .then(function(obj) {
          return obj["document"]["docData"].length;
        });
      return expect(value).to.be.above(testFiles.textLength);
    });

    // .word doc file
    it(".word doc: Response is not undefined.", () => {
      return expect(
        convertClient.convertToPdf(
          createConvertToPdf(testFiles.wordData, testFiles.wordName)
        )
      ).to.not.be.rejected;
    });

    it(".word doc: PDF document length is greater than the original's file length.", () => {
      let value = convertClient
        .convertToPdf(
          createConvertToPdf(testFiles.wordData, testFiles.wordName)
        )
        .then(function(obj) {
          return obj["document"]["docData"].length;
        });
      return expect(value).to.be.above(testFiles.wordLength);
    });

    // excel doc file
    it(".excel doc: Response is not undefined.", () => {
      return expect(
        convertClient.convertToPdf(
          createConvertToPdf(testFiles.excelData, testFiles.excelName)
        )
      ).to.not.be.rejected;
    });

    it(".excel doc: PDF document length is greater than the original's file length.", () => {
      let value = convertClient
        .convertToPdf(
          createConvertToPdf(testFiles.excelData, testFiles.excelName)
        )
        .then(function(obj) {
          return obj["document"]["docData"].length;
        });
      return expect(value).to.be.above(testFiles.excelLength);
    });

    // .eml file
    it(".eml file: Response is not undefined.", () => {
      return expect(
        convertClient.convertToPdf(
          createConvertToPdf(testFiles.emlData, testFiles.emlName)
        )
      ).to.not.be.rejected;
    });

    it(".eml file: PDF document length is greater than the original's file length.", () => {
      let value = convertClient
        .convertToPdf(createConvertToPdf(testFiles.emlData, testFiles.emlName))
        .then(function(obj) {
          return obj["document"]["docData"].length;
        });
      return expect(value).to.be.above(testFiles.emlLength);
    });

    // .msg file
    it(".msg file: Response is not undefined.", () => {
      return expect(
        convertClient.convertToPdf(
          createConvertToPdf(testFiles.msgData, testFiles.msgName)
        )
      ).to.not.be.rejected;
    });

    it(".msg file: PDF document length is greater than the original's file length.", () => {
      let value = convertClient
        .convertToPdf(createConvertToPdf(testFiles.msgData, testFiles.msgName))
        .then(function(obj) {
          return obj["document"]["docData"].length;
        });
      return expect(value).to.be.above(testFiles.msgLength);
    });

    // .jpg file
    it(".jpg file: Response is not undefined.", () => {
      return expect(
        convertClient.convertToPdf(
          createConvertToPdf(testFiles.jpgData, testFiles.jpgName)
        )
      ).to.not.be.rejected;
    });

    it(".jpg file: PDF document length is greater than the original's file length.", () => {
      let value = convertClient
        .convertToPdf(createConvertToPdf(testFiles.jpgData, testFiles.jpgName))
        .then(function(obj) {
          return obj["document"]["docData"].length;
        });
      return expect(value).to.be.above(testFiles.jpgLength);
    });

    // .zip file
    it(".zip file: Response is not undefined.", () => {
      return expect(
        convertClient.convertToPdf(
          createConvertToPdf(testFiles.zipData, testFiles.zipName)
        )
      ).to.not.be.rejected;
    });

    it(".zip file: PDF document length is greater than zero and smaller than the original file length.", () => {
      let value = convertClient
        .convertToPdf(createConvertToPdf(testFiles.zipData, testFiles.zipName))
        .then(function(obj) {
          return obj["document"]["docData"].length;
        });
      return expect(value).to.be.within(0, testFiles.zipLength);
    });
    */
  });

  /* ------------------------ConvertFileToPdf------------------------------ */
  describe("method: convertFileToPdf", () => {
    /*
    // .txt file
    it(".txt file: Response is not undefined.", () => {
      return expect(
        convertClient.convertFileToPdf(
          testFiles.textName,
          testFiles.getTextStream()
        )
      ).to.not.be.rejected;
    });

    it(".txt file: PDF document length is greater than its original length.", () => {
      let value = convertClient
        .convertFileToPdf(testFiles.textName, testFiles.getTextStream())
        .then(function(pdf: Buffer) {
          return pdf.toString("base64").length;
        });
      return expect(value).to.be.above(testFiles.textLength);
    });

    // .word doc file
    it(".word doc file: Response is not undefined.", () => {
      return expect(
        convertClient.convertFileToPdf(
          testFiles.wordName,
          testFiles.getWordStream()
        )
      ).to.not.be.rejected;
    });

    it(".word doc file: PDF document length is greater than its original length.", () => {
      let value = convertClient
        .convertFileToPdf(testFiles.wordName, testFiles.getWordStream())
        .then(function(pdf: Buffer) {
          return pdf.toString("base64").length;
        });
      return expect(value).to.be.above(testFiles.wordLength);
    });

    // .excel doc file
    it(".excel doc file: Response is not undefined.", () => {
      return expect(
        convertClient.convertFileToPdf(
          testFiles.excelName,
          testFiles.getExcelStream()
        )
      ).to.not.be.rejected;
    });

    it(".excel doc file: PDF document length is greater than its original length.", () => {
      let value = convertClient
        .convertFileToPdf(testFiles.excelName, testFiles.getExcelStream())
        .then(function(pdf: Buffer) {
          return pdf.toString("base64").length;
        });
      return expect(value).to.be.above(testFiles.excelLength);
    });

    // .eml file
    it(".eml file: Response is not undefined.", () => {
      return expect(
        convertClient.convertFileToPdf(
          testFiles.emlName,
          testFiles.getEmlStream()
        )
      ).to.not.be.rejected;
    });

    it(".eml file: PDF document length is greater than its original length.", () => {
      let value = convertClient
        .convertFileToPdf(testFiles.emlName, testFiles.getEmlStream())
        .then(function(pdf: Buffer) {
          return pdf.toString("base64").length;
        });

      return expect(value).to.be.above(testFiles.emlLength);
    });

    // .msg file
    it(".msg file: Response is not undefined.", () => {
      return expect(
        convertClient.convertFileToPdf(
          testFiles.msgName,
          testFiles.getMsgStream()
        )
      ).to.not.be.rejected;
    });

    it(".msg file: PDF document length is greater than its original length.", () => {
      let value = convertClient
        .convertFileToPdf(testFiles.msgName, testFiles.getMsgStream())
        .then(function(pdf: Buffer) {
          return pdf.toString("base64").length;
        });
      return expect(value).to.be.above(testFiles.msgLength);
    });

    // .jpg file
    it(".jpg file: Response is not undefined.", () => {
      return expect(
        convertClient.convertFileToPdf(
          testFiles.jpgName,
          testFiles.getJpgStream()
        )
      ).to.not.be.rejected;
    });

    it(".jpg file: PDF document length is greater than its original length.", () => {
      let value = convertClient
        .convertFileToPdf(testFiles.jpgName, testFiles.getJpgStream())
        .then(function(pdf: Buffer) {
          return pdf.toString("base64").length;
        });
      return expect(value).to.be.above(testFiles.jpgLength);
    });

    // .zip file
    it(".zip file: Response is not undefined.", () => {
      return expect(
        convertClient.convertFileToPdf(
          testFiles.zipName,
          testFiles.getZipStream()
        )
      ).to.not.be.rejected;
    });

    it(".zip file: PDF document length is greater than zero and smaller than the original file length.", () => {
      let value = convertClient
        .convertFileToPdf(testFiles.zipName, testFiles.getZipStream())
        .then(function(pdf: Buffer) {
          return pdf.toString("base64").length;
        });
      return expect(value).to.be.within(0, testFiles.zipLength);
    });
    */
  });
});
