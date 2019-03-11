const fs = require('fs')
const path = require('path')
const pdf4me = require('../../../src/index')

// create pdf4meClient
const pdf4me = pdf4me.createClient(process.env.PDF4ME_API_KEY)

// create the convert request
const convertReq = {
  document: {
    docData: fs.readFileSync(path.join(__dirname, 'wordDoc.docx')).toString('base64'),
    name: 'wordDoc.docx',
  },
  convertToPdfAction: {
    pdfConformance: 'pdfA1',
  },
}

// convertToPdf
pdf4me
  .convertToPdf(convertReq)
  .then(function(convertRes) {
    // returns a convertRes
    const pdfDocument = Buffer.from(convertRes.document.docData, 'base64')
    fs.writeFileSync(path.join(__dirname, 'convertToPdf_result.pdf'), pdfDocument)
  })
  .catch(err => {
    console.log(err)
  })
