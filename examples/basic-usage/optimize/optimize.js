const fs = require('fs')
const path = require('path')
const pdf4me = require('../../../src/index')

// create pdf4meClient
const pdf4meClient = pdf4me.createClient(process.env.PDF4ME_API_KEY)

// create optimize object
const optimizeReq = {
  // document
  document: {
    docData: fs.readFileSync(path.join(__dirname, 'myPdf.pdf')).toString('base64'),
  },
  // action
  optimizeAction: {
    useProfile: true,
    profile: 'web',
  },
}

// optimize
pdf4meClient
  .optimize(optimizeReq)
  .then(function(optimizeRes) {
    // extracting the generated PDF and writing it to disk
    const pdfDocument = Buffer.from(optimizeRes.document.docData, 'base64')
    fs.writeFileSync(path.join(__dirname, 'optimize_result.pdf'), pdfDocument)
  })
  .catch(error => {
    console.log(error)
    process.exit(1)
  })
