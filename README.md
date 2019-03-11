# pdf4me api client (preview) - the Node.js package for the Pdf4me Saas API

![npm](https://img.shields.io/npm/v/pdf4me.svg) ![license](https://img.shields.io/github/license/mashape/apistatus.svg) ![Maintenance](https://img.shields.io/maintenance/yes/2018.svg) ![Build](https://ynoox.visualstudio.com/_apis/public/build/definitions/2e29c2f0-3f4a-40e1-a4b1-1cc465571206/304/badge)

The Pdf4me Client API is a Node.js package which connects to its highly scalable SaaS cloud service with many functionalities to solve your document and PDF requirements. The SaaS API provides expert functionality to convert, optimize, compress, produce, merge, split, ocr, enrich, archive, print documents and PDF's.

| Feature            | Description                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------------------- |
| **Optimize**       | PDF's can often be optimized by removing structural redundancy. This leads to much smaller PDF's. |
| **Merge**          | Multiple PDF's can be merged into single optimized PDFs.                                          |
| **Split**          | A PDF can be splitted into multiple PDF's.                                                        |
| **Extract**        | From a PDF extract multiple pages into a new document.                                            |
| **Images**         | Extract images from your document, can be any type of document.                                   |
| **Create Pdf/A**   | Create a archive conform PDF/A including xmp Metadata.                                            |
| **Convert to PDF** | Convert your documents from any format to a proper PDF document.                                  |
| **Stamp**          | Stamp your document with text or images.                                                          |

## Getting Started

### Installation

`npm install pdf4me`

To get started get a Token by dropping us an email (support-dev@pdf4me.com).

The Token is required to Authenticate with OAuth2. The Pdf4me Client Api provides you already with the necessary implementation. You need only to get an instance for the Pdf4meClient as shown in the sample below.

```javascript
//The authentication setup happens through the Pdf4meClient.

const fs = require('fs')
const pdf4me = require('pdf4me')

const pdf4meClient = new pdf4me.Pdf4meClient(token)

/*
The pdf4meClient object delivers the necessary authentication when instantiating
the different pdf4meClients such as for instance the mergeClient
*/

// setup the mergeClient
const mergeClient = new pdf4me.MergeClient(pdf4meClient)

// merge
const responsePromise = mergeClient.merge2Pdfs(
  fs.createReadStream('./myFirstPdf.pdf'),
  fs.createReadStream('./mySecondPdf.pdf')
)
responsePromise.then(
  function(pdf) {
    fs.writeFileSync('./mergedPdf.pdf', pdf)
  },
  function(err) {
    console.log(err)
  }
)
```

## Documentation

Please visit our [documentation]() for more information about all the functionalities provided and on how to use pdf4me.

## Examples

### Basic Usage

- convert
  - convertToPdf
