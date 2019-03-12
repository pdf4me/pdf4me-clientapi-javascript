const fs = require('fs')
const path = require('path')
const pdf4me = require('../../../src/index')

// create pdf4meClient
const pdf4meClient = pdf4me.createClient(process.env.PDF4ME_API_KEY)

// optimize
pdf4meClient
  .optimizeByProfile('print', fs.createReadStream(path.join(__dirname, 'myPdf.pdf')))
  .then(pdf => {
    // and writing the resulting PDFs to disk
    fs.writeFileSync(path.join(__dirname, 'optimizeByProfile_result.pdf'), pdf)
  })
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
