const fs = require('fs')
const path = require('path')
const pdf4me = require('../../../src/index')

// setup the pdf4meClient
const pdf4meClient = pdf4me.createClient(process.env.PDF4ME_API_KEY)

// create the Split object
const splitReq = {
  // document
  document: {
    name: "myPdf.pdf",
    docData: fs.readFileSync(path.join(__dirname, 'myPdf.pdf')).toString('base64'),
  },
  // action
  splitByBarcodeAction: {
    barcodeString: "ara",
    barcodeFilter: "startsWith",
    barcodeType: "any",
    splitBarcodePage: "before",
    pdfRenderDpi: 150,
    combinePagesWithSameConsecutiveBarcodes: false,
  }
}

// split
pdf4meClient.splitByBarcode(splitReq)
  .then(splitRes => {
    const {splittedDocuments} = splitRes
    // extract the resulting documents and writing them to disk
    const length = splittedDocuments?.length || 0;
    if (length) {
      if (length >= 2) {
        const pdf1 = Buffer.from(splittedDocuments[0].docData, 'base64')
        const pdf2 = Buffer.from(splittedDocuments[1].docData, 'base64')
        fs.writeFileSync(path.join(__dirname, 'splitByBarcode_pdf1_result.pdf'), pdf1)
        fs.writeFileSync(path.join(__dirname, 'splitByBarcode_pdf2_result.pdf'), pdf2)
      } else {
        const pdf = Buffer.from(splittedDocuments[0].docData, 'base64')
        fs.writeFileSync(path.join(__dirname, 'splitByBarcode_pdf1_result.pdf'), pdf)
      }
    }
  })
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
