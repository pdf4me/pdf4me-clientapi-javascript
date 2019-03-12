const fs = require('fs')
const path = require('path')
const pdf4me = require('../../../src/index')

// create pdf4meClient
const pdf4meClient = pdf4me.createClient(process.env.PDF4ME_API_KEY)

// create convertToPdf object
const convertToPdfReq = {
  // document
  document: {
    docData: fs.readFileSync(path.join(__dirname, 'wordDoc.docx')).toString('base64'),
    name: 'wordDoc.docx',
  },
  // action
  convertToPdfAction: {
    pdfConformance: 'pdfA1',
    conversionMode: 'fast',
  },
}

// conversion
pdf4meClient
  .convertToPdf(convertToPdfReq)
  .then(function(convertToPdfRes) {
    // extract the generated PDF and write it to disk
    const pdfDocument = Buffer.from(convertToPdfRes.document.docData, 'base64')
    fs.writeFileSync(path.join(__dirname, 'convertToPdf_result.pdf'), pdfDocument)
  })
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
