const fs = require('fs')
const path = require('path')
const pdf4me = require('../../../src/index')

// create pdf4meClient
const pdf4me = pdf4me.createClient(process.env.PDF4ME_API_KEY)

// convertToPdf
pdf4me
  .convertFileToPdf(fs.createReadStream(path.join(__dirname, 'wordDoc.docx')))
  .then(function(pdfDocument) {
    // returns a buffer with the converted document
    fs.writeFileSync(path.join(__dirname, 'convertFileToPdf_result.pdf'), pdfDocument)
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
