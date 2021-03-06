const fs = require('fs')
const path = require('path')
const pdf4me = require('../../../src/index')

// create pdf4meClient
const pdf4meClient = pdf4me.createClient(process.env.PDF4ME_API_KEY)

// conversion to PDF/A with pdf_compliance specification
pdf4meClient
  .createPdfA('pdfA1b', fs.createReadStream(path.join(__dirname, 'myPdf.pdf')))
  .then(pdf => {
    // writing the PDF/A to disk
    fs.writeFileSync(path.join(__dirname, 'createPdfA_result.pdf'), pdf)
  })
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
