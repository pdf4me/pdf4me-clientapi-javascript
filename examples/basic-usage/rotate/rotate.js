const fs = require('fs')
const path = require('path')
const pdf4me = require('../../../src/index')

// setup the pdf4meClient
const pdf4meClient = pdf4me.createClient(process.env.PDF4ME_API_KEY)

// create rotate object
const rotateReq = {
  // document
  document: {
    docData: fs.readFileSync(path.join(__dirname, 'myPdf.pdf')).toString('base64'),
  },
  // action
  rotateAction: {
    rotationList: [
      {
        pageNr: 1,
        rotationType: 'clockwise',
      },
      {
        pageNr: 2,
        rotationType: 'counterClockwise',
      },
      {
        pageNr: 3,
        rotationType: 'upsideDown',
      },
    ],
  },
}

// rotate
pdf4meClient
  .rotate(rotateReq)
  .then(function(rotateRes) {
    // extracting the generated PDF and writing it to disk
    const pdfDocument = Buffer.from(rotateRes.document.docData, 'base64')
    fs.writeFileSync(path.join(__dirname, 'rotate_result.pdf'), pdfDocument)
  })
  .catch(error => {
    console.log(error)
    process.exit(1)
  })
