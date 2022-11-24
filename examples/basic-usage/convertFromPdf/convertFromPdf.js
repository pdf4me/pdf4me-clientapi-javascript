const fs = require('fs')
const path = require('path')
const pdf4me = require('../../../src/index')

// create pdf4meClient
const pdf4meClient = pdf4me.createClient(process.env.PDF4ME_API_KEY)

// create convertToPdf object
const convertFromPdfReq = {
  // document
  document: {
    docData: fs.readFileSync(path.join(__dirname, 'pdf2.pdf')).toString('base64'),
    name: 'pdf2.pdf',
  },
  // action
  convertFromPdfAction: {
    outputFormat: 'docx',
    qualityType: 'draft',
  },
}

// conversion
pdf4meClient
  .convertFromPdf(convertFromPdfReq)
  .then(function (convertFromPdfRes) {
    // extract the generated word and write it to disk
    const pdfDocument = Buffer.from(convertFromPdfRes.document.docData, 'base64')
    fs.writeFileSync(path.join(__dirname, 'convertFromPdf_result.docx'), pdfDocument)
  })
  .catch((err) => {
    console.log(err)
    process.exit(1)
  })
