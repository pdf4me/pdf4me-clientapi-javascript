# Pdf4me.Client - the Node.js package for the Pdf4me Saas API


![npm](https://img.shields.io/npm/v/pdf4me.svg) ![license](https://img.shields.io/github/license/mashape/apistatus.svg) ![Maintenance](https://img.shields.io/maintenance/yes/2018.svg) ![Build](https://ynoox.visualstudio.com/_apis/public/build/definitions/2e29c2f0-3f4a-40e1-a4b1-1cc465571206/304/badge)


The Pdf4me Client API is a Node.js package which connects to its highly scalable SaaS cloud service with many functionalities to solve your document and PDF requirements. The SaaS API provides expert functionality to convert, optimize, compress, produce, merge, split, ocr, enrich, archive, print documents and PDF's.

Feature | Description 
------------ | ------------- 
**Optimize** | PDF's can often be optimized by removing structural redundancy. This leads to much smaller PDF's.
**Merge** | Multiple PDF's can be merged into single optimized PDFs.
**Split** | A PDF can be splitted into multiple PDF's.
**Extract** | From a PDF extract multiple pages into a new document.
**Images** | Extract images from your document, can be any type of document.
**Create Pdf/A** | Create a archive conform PDF/A including xmp Metadata.
**Convert to PDF** | Convert your documents from any format to a proper PDF document.
**Stamp** | Stamp your document with text or images.

## Getting Started

To get started get a Token by dropping us an email (support-dev@pdf4me.com).

The Token is required to Authenticate with OAuth2. The Pdf4me Client Api provides you already with the necessary implementation. You need only to get an instance for the Pdf4meClient as shown in the sample below.

```javascript
//The authentication setup happens through the Pdf4meClient.

const fs = require('fs');
const pdf4me = require('pdf4me');

let pdf4meClient = new pdf4me.Pdf4meClient(token);

/*
The pdf4meClient object delivers the necessary authentication when instantiating
the different pdf4meClients such as for instance the mergeClient
*/

// setup the mergeClient
let mergeClient = new pdf4me.MergeClient(pdf4meClient);

// merge
let responsePromise = mergeClient.merge2Pdfs(fs.createReadStream('./myFirstPdf.pdf'), fs.createReadStream('./mySecondPdf.pdf'));
responsePromise.then(function (pdf) {
    fs.writeFileSync('./mergedPdf.pdf', pdf);
}, function (err) {
    console.log(err);
});
```

## Documentation

Please visit our [documentation]() for more information about all the functionalities provided and on how to use pdf4me.


## Recommendation

It's recommended to create an instance of `Pdf4meClient` per thread in a multithreaded environment to avoid any potential issues.

## Contribution

Contributions are very welcome. Please have a look at the instructions below for a smooth project setup.

1. Fork pdf4me
2. Clone your copy of pdf4me
3. Download the needed node modules
> - In the Pdf4meJsClientApi/pdf4me folder run: *npm install*
> - In the Pdf4meJsClientApiTest folder run: *npm install*
4. Link the pdf4me project to the test environment
> - In the Pdf4meJsClientApi/pdf4me folder run: *npm link*
> - In the Pdf4meJsClientApiTest folder run: *npm link pdf4me*
5. Generate the .js files
> - In the Pdf4meJsClientApiTest folder run: *tsc* 
6. You are ready to go

#### Running the Test Cases
In order for the test cases to run, a config.json file containing the token must be stored in the Pdf4meJsClientApiTest folder. Please drop us an email (support-dev@pdf4me.com), so we can provide you the developer the token for testing the code of your pull request.
To run the test cases, simply run: *npm test* (from the Pdf4meJsClientApiTest folder).