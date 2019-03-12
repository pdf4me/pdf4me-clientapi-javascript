const fs = require('fs')
const path = require('path')
const pdf4me = require('../../../src/index')

// create pdf4meClient
const pdf4meClient = pdf4me.createClient(process.env.PDF4ME_API_KEY)

// stamp document
pdf4meClient
  .textStamp('SAMPLE TEXT', 'all', 'left', 'top', fs.createReadStream(path.join(__dirname, 'myPdf.pdf')))
  .then(pdf => {
    // and writing the resulting PDFs to disk
    fs.writeFileSync(path.join(__dirname, 'textStamp_result.pdf'), pdf)
  })
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
