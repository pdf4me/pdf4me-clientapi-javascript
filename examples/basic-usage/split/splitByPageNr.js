const fs = require('fs')
const path = require('path')
const pdf4me = require('../../../src/index')

// create pdf4meClient
const p4mClient = pdf4me.createClient(process.env.PDF4ME_API_KEY)

// split the PDF into two
p4mClient
  .splitByPageNr(2, fs.createReadStream(path.join(__dirname, 'myPdf.pdf')))
  .then(splitRes => {
    // and writing the resulting PDFs to disk
    fs.writeFileSync(path.join(__dirname, 'splitByPageNr_pdf1_result.pdf'), splitRes[0])
    fs.writeFileSync(path.join(__dirname, 'splitByPageNr_pdf2_result.pdf'), splitRes[1])
  })
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
