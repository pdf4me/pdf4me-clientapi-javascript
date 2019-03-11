const fs = require('fs')
const path = require('path')
const pdf4me = require('../../../src/index')

// create pdf4meClient
const pdf4me = pdf4me.createClient(process.env.PDF4ME_API_KEY)

// create the extract request
const extractReq = {
  document: {
    docData: fs.readFileSync(path.join(__dirname, 'pdf1.pdf')).toString('base64'),
    name: 'wordDoc.docx',
  },
  extractAction: {
    pdfConformance: 'pdfA1',
  },
}

// extractToPdf
pdf4me
  .extract(extractReq)
  .then(function(extractRes) {
    // returns a extractRes
    const pdfDocument = Buffer.from(extractRes.document.docData, 'base64')
    fs.writeFileSync(path.join(__dirname, 'extractToPdf_result.pdf'), pdfDocument)
  })
  .catch(err => {
    console.log(err)
  })
