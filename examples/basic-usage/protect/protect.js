const fs = require('fs')
const path = require('path')
const pdf4me = require('../../../src/index')

// create pdf4meClient
const pdf4meClient = pdf4me.createClient(process.env.PDF4ME_API_KEY)

// create protect object
const protectReq = {
  // document
  document: {
    docData: fs.readFileSync(path.join(__dirname, 'myPdf.pdf')).toString('base64'),
  },
  // action
  protectAction: {
    userPassword: '123456',
  },
}

// protect
pdf4meClient
  .protect(protectReq)
  .then(function(protectRes) {
    // extracting the generated PDF and writing it to disk
    const pdfDocument = Buffer.from(protectRes.document.docData, 'base64')
    fs.writeFileSync(path.join(__dirname, 'protect_result.pdf'), pdfDocument)
  })
  .catch(error => {
    console.log(error)
    process.exit(1)
  })
