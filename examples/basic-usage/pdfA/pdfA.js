const fs = require('fs')
const path = require('path')
const pdf4me = require('../../../src/index')

// create pdf4meClient
const pdf4meClient = pdf4me.createClient(process.env.PDF4ME_API_KEY)

// create createPdfA object
const createPdfAReq = {
  // document
  document: {
    docData: fs.readFileSync(path.join(__dirname, 'myPdf.pdf')).toString('base64'),
  },
  // action
  pdfAAction: {
    compliance: 'pdfA1b',
  },
}

// create PDF/A
pdf4meClient
  .pdfA(createPdfAReq)
  .then(function(pdfARes) {
    // extract the PDF/A and writing it to disk
    const pdfDocument = Buffer.from(pdfARes.document.docData, 'base64')
    fs.writeFileSync(path.join(__dirname, 'pdfA_result.pdf'), pdfDocument)
  })
  .catch(error => {
    console.log(error)
    process.exit(1)
  })
