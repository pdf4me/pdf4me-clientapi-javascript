const fs = require('fs')
const path = require('path')
const pdf4me = require('../../../src/index')

// setup the pdf4meClient
const pdf4meClient = pdf4me.createClient(process.env.PDF4ME_API_KEY)

// create the Split object
const splitReq = {
  // document
  document: {
    docData: fs.readFileSync(path.join(__dirname, 'myPdf.pdf')).toString('base64'),
  },
  // action
  splitAction: {
    splitAfterPage: 2,
  },
}

// split
pdf4meClient
  .split(splitReq)
  .then(splitRes => {
    // extract the resulting documents and writing them to disk
    const pdf1 = Buffer.from(splitRes.documents[0].docData, 'base64')
    const pdf2 = Buffer.from(splitRes.documents[0].docData, 'base64')
    fs.writeFileSync(path.join(__dirname, 'split_pdf1_result.pdf'), pdf1)
    fs.writeFileSync(path.join(__dirname, 'split_pdf2_result.pdf'), pdf2)
  })
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
