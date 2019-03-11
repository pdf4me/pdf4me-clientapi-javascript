const fs = require('fs')
const pdf4me = require('pdf4me')

// setup the pdf4meClient
const pdf4meClient = pdf4me.createClient('YOUR_API_KEY')

// create the merge request
const mergeReq = {
  documents: [
    {
      docData: fs.readFileSync('./pdf1.pdf').toString('base64'),
    },
    {
      docData: fs.readFileSync('./pdf1.pdf').toString('base64'),
    },
  ],
  mergeAction: {},
}

// merge
pdf4meClient
  .merge(mergeReq)
  .then(function(mergeRes) {
    const pdf = new Buffer(mergeRes.document.docData, 'base64')
    fs.writeFileSync('./mergedPdf.pdf', pdf)
  })
  .catch(err => {
    console.log(err)
  })
