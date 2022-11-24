# pdf4me api client - the Node.js package for the Pdf4me Saas API

![npm](https://img.shields.io/npm/v/pdf4me.svg) ![license](https://img.shields.io/github/license/mashape/apistatus.svg) ![Maintenance](https://img.shields.io/maintenance/yes/2018.svg) ![Build](https://ynoox.visualstudio.com/_apis/public/build/definitions/2e29c2f0-3f4a-40e1-a4b1-1cc465571206/304/badge)

The [Pdf4me Client API](https://developer.pdf4me.com/docs/api/getting-started/) is a Node.js package which connects to its highly scalable SaaS cloud service with many functionalities to solve your document and PDF requirements. The SaaS API provides expert functionality to convert, optimize, compress, produce, merge, split, ocr, enrich, archive, print documents and PDF's.

| Feature                                                                                         | Description                                                                                       |
| ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| [**Optimize**](https://developer.pdf4me.com/docs/api/basic-functionality/optimize/)             | PDF's can often be optimized by removing structural redundancy. This leads to much smaller PDF's. |
| [**Merge**](https://developer.pdf4me.com/docs/api/basic-functionality/merge-pdfs/)              | Multiple PDF's can be merged into single optimized PDFs.                                          |
| [**Split**](https://developer.pdf4me.com/docs/api/basic-functionality/split-pdf/)               | A PDF can be splitted into multiple PDF's.                                                        |
| [**Extract**](https://developer.pdf4me.com/docs/api/basic-functionality/extract-pdf/)           | From a PDF extract multiple pages into a new document.                                            |
| [**OCR**](https://developer.pdf4me.com/docs/api/basic-functionality/ocr/)                       | Create a searchable OCR Document out of your scans or images.                                     |
| [**Images**](https://developer.pdf4me.com/docs/api/basic-functionality/create-image/)           | Extract images from your document, can be any type of document.                                   |
| [**Create Pdf/A**](https://developer.pdf4me.com/docs/api/basic-functionality/pdfa/)             | Create a archive conform PDF/A including xmp Metadata.                                            |
| [**Convert to PDF**](https://developer.pdf4me.com/docs/api/basic-functionality/convert-to-pdf/) | Convert your documents from any format to a proper PDF document.                                  |
| [**Stamp**](https://developer.pdf4me.com/docs/api/basic-functionality/stamp/)                   | Stamp your document with text or images.                                                          |
| [**Rotate**](https://developer.pdf4me.com/docs/api/basic-functionality/rotate-pdf/)             | Rotates pages in your document.                                                                   |
| [**Protect**](https://developer.pdf4me.com/docs/api/basic-functionality/protect/)               | Protects or Unlocks your document with given password.                                            |
| [**Validation**](https://developer.pdf4me.com/docs/api/basic-functionality/validate/)           | Validate your document for PDF/A compliance.                                                      |
| [**Repair**](https://developer.pdf4me.com/docs/api/basic-functionality/repair/)                 | Repairs your document.                                                                            |
| [**Barcode**](https://developer.pdf4me.com/docs/api/basic-functionality/barcode/)               | Reads all types of barcode embedded in document or creates them                                   |

## Getting Started

### Get API key

To use pdf4me, you need a Api Key. You can get a free Api Key from our [developer portal](https://portal.pdf4me.com).

### Installation

`npm install pdf4me-js`

### Basic Usage

```javascript
// create pdf4meClient
const pdf4meClient = pdf4me.createClient('YOUR API KEY')

const pdfDocument = await pdf4meClient.convertFileToPdf(
  fs.createReadStream('myWordDoc.docx')
)

fs.writeFileSync(
  path.join(__dirname, 'myPdfDocument.pdf'),
  pdfDocument
)
```

## Documentation

Please visit our [documentation](https://developer.pdf4me.com/docs/api/basic-functionality/) for more information about all the functionalities provided and on how to use pdf4me.

#### PDF4me Consumer

Those who are looking for PDF4me online tool can find it at [PDF4me.com](https://pdf4me.com/)
