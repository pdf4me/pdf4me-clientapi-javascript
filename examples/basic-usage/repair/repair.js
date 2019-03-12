const fs = require('fs')
const path = require('path')
const pdf4me = require('../../../src/index')

// create pdf4meClient
const pdf4meClient = pdf4me.createClient(process.env.PDF4ME_API_KEY)

// create repair object
const repairReq = {
  // document
  document: {
    docData: fs.readFileSync(path.join(__dirname, 'myPdf.pdf')).toString('base64'),
  },
  // action
  repairAction: {
    analyzeOnly: false,
    recoverPages: true,
    recoverXREF: true,
    rebuildFonts: true,
    rebuildFontsAsType1: true,
    rebuildStreams: true,
  },
}

// repair
pdf4meClient
  .repair(repairReq)
  .then(function(repairRes) {
    // extracting the generated PDF and writing it to disk
    const pdfDocument = Buffer.from(repairRes.document.docData, 'base64')
    fs.writeFileSync(path.join(__dirname, 'repair_result.pdf'), pdfDocument)
  })
  .catch(error => {
    console.log(error)
    process.exit(1)
  })
