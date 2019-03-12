const fs = require('fs')
const path = require('path')
const pdf4me = require('../../../src/index')

// create pdf4meClient
const pdf4meClient = pdf4me.createClient(process.env.PDF4ME_API_KEY)

// conversion
pdf4meClient
  .convertFileToPdf(fs.createReadStream(path.join(__dirname, 'wordDoc.docx')))
  .then(function(pdfDocument) {
    // and writing the generated PDF to disk
    fs.writeFileSync(path.join(__dirname, 'convertFileToPdf_result.pdf'), pdfDocument)
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
