import * as fs from "fs";
import * as path from "path";
import { JsxEmit } from "typescript";

const TestFiles = {
  files: {
    pdf1: "pdf1.pdf",
    pdf2: "pdf2.pdf",
    text: "txt.txt",
    email_eml: "email.eml",
    email_msg: "email.msg",
    excel: "excel.xls",
    picture_jpg: "picture.jpg",
    docx: "wordDoc.docx",
    zip: "zip.zip"
  },
  getReadStream: (filename: string) => {
    return fs.createReadStream(path.join(__dirname, filename));
  },
  getFileBuffer: (filename: string) => {
    return fs.readFileSync(path.join(__dirname, filename));
  },
  getBase64FileContent: (filename: string) => {
    return fs.readFileSync(path.join(__dirname, filename)).toString("base64");
  }
};

export default TestFiles;
