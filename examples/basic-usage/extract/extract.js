const fs = require('fs')
const path = require('path')
const pdf4me = require('../../../src/index')

// create pdf4meClient
const pdf4meClient = pdf4me.createClient(process.env.PDF4ME_API_KEY)

// create extract object
const extractReq = {
  // document
  document: {
    docData: fs.readFileSync(path.join(__dirname, 'myPdf.pdf')).toString('base64'),
  },
  // action
  extractAction: {
    extractPages: [1, 4],
  },
}

// extraction
pdf4meClient
  .extract(extractReq)
  .then(function(extractRes) {
    // extracting the generated PDF and writing it to disk
    const pdfDocument = Buffer.from(extractRes.document.docData, 'base64')
    fs.writeFileSync(path.join(__dirname, 'extract_result.pdf'), pdfDocument)
  })
  .catch(error => {
    console.log(error)
    process.exit(1)
  })
