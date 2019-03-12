const fs = require('fs')
const path = require('path')
const pdf4me = require('../../../src/index')

// setup the pdf4meClient
const pdf4meClient = pdf4me.createClient(process.env.PDF4ME_API_KEY)

// rotate
pdf4meClient
  .rotateDocument('counterClockwise', fs.createReadStream(path.join(__dirname, 'myPdf.pdf')))
  .then(pdf => {
    // and writing the resulting PDF to disk
    fs.writeFileSync(path.join(__dirname, 'rotateDocument_result.pdf'), pdf)
  })
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
