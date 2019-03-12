const fs = require('fs')
const path = require('path')
const pdf4me = require('../../../src/index')

// create pdf4meClient
const pdf4meClient = pdf4me.createClient(process.env.PDF4ME_API_KEY)

// create stamp object
const stampReq = {
  // document
  document: {
    docData: fs.readFileSync(path.join(__dirname, 'myPdf.pdf')).toString('base64'),
  },
  // action
  stampAction: {
    text: {
      value: 'EXAMPLE TEXT',
      size: 55,
      color: { red: 0.5, green: 0.5, blue: 0 },
    },
    alpha: 0.25,
    rotate: -52,
    pageSequence: 'all',
    stampType: 'foreground',
    alignX: 'center',
    alignY: 'middle',
  },
}

// stamp
pdf4meClient
  .stamp(stampReq)
  .then(function(stampRes) {
    // extracting the generated PDF and writing it to disk
    const pdfDocument = Buffer.from(stampRes.document.docData, 'base64')
    fs.writeFileSync(path.join(__dirname, 'stamp_result.pdf'), pdfDocument)
  })
  .catch(error => {
    console.log(error)
    process.exit(1)
  })
