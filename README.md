# pdf4me api client (preview) - the Node.js package for the Pdf4me Saas API

![npm](https://img.shields.io/npm/v/pdf4me.svg) ![license](https://img.shields.io/github/license/mashape/apistatus.svg) ![Maintenance](https://img.shields.io/maintenance/yes/2018.svg) ![Build](https://ynoox.visualstudio.com/_apis/public/build/definitions/2e29c2f0-3f4a-40e1-a4b1-1cc465571206/304/badge)

The Pdf4me Client API is a Node.js package which connects to its highly scalable SaaS cloud service with many functionalities to solve your document and PDF requirements. The SaaS API provides expert functionality to convert, optimize, compress, produce, merge, split, ocr, enrich, archive, print documents and PDF's.

| Feature            | Description                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------------------- |
| **Split**          | A PDF can be splitted into multiple PDF's.                                                        |
| **Merge**          | Multiple PDF's can be merged into single optimized PDFs.                                          |
| **Images**         | Extract images from your document, can be any type of document.                                   |
| **Extract**        | From a PDF extract multiple pages into a new document.                                            |
| **Rotate**         | Rotate allows selected pages or all pages in a document to be rotated in given direction.         |
| **Optimize**       | PDF's can often be optimized by removing structural redundancy. This leads to much smaller PDF's. |
| **Protect**        | Set or remove password and permissions from a document.                                           |
| **Convert to PDF** | Convert your documents from any format to a proper PDF document.                                  |
| **Validate**       | validation on pdf document compliance.                                                            |
| **Create Pdf/A**   | Create a archive conform PDF/A including xmp Metadata.                                            |
| **Repair**         | analyse and repair PDF files against corruption or recover content from corrupt files.            |
| **Stamp**          | Stamp your document with text or images.                                                          |

## Getting Started

### Get API key

To use pdf4me, you need a Api Key. You can get a free Api Key from our [developer portal](https://portal.pdf4me.com).

### Installation

`npm install pdf4me`

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

Please visit our [documentation]() for more information about all the functionalities provided and on how to use pdf4me.
