const fs = require('fs')
const path = require('path')
const pdf4me = require('../../../src/index')

// setup the pdf4meClient
const pdf4meClient = pdf4me.createClient(process.env.PDF4ME_API_KEY)

// create merge object
const mergeReq = {
  // documents
  documents: [
    {
      docData: fs.readFileSync(path.join(__dirname, 'myFirstPdf.pdf')).toString('base64'),
    },
    {
      docData: fs.readFileSync(path.join(__dirname, 'mySecondPdf.pdf')).toString('base64'),
    },
  ],
  // action
  mergeAction: {},
}

// merge
pdf4meClient
  .merge(mergeReq)
  .then(function(mergeRes) {
    // extract the merged PDF and writing it to disk
    const pdf = Buffer.from(mergeRes.document.docData, 'base64')
    fs.writeFileSync(path.join(__dirname, 'merge_result.pdf'), pdf)
  })
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
