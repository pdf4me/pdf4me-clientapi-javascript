const fs = require('fs')
const path = require('path')
const pdf4me = require('../../../src/index')

// create pdf4meClient
const pdf4meClient = pdf4me.createClient(process.env.PDF4ME_API_KEY)

// create validate object
const validateReq = {
  // document
  document: {
    docData: fs.readFileSync(path.join(__dirname, 'myPdf.pdf')).toString('base64'),
  },
  // action
  validateAction: {
    pdfConformance: 'pdfA1b',
  },
}

// validate
pdf4meClient
  .validate(validateReq)
  .then(function(validateRes) {
    // and writing it to disk as json
    fs.writeFileSync(path.join(__dirname, 'validate_result.json'), JSON.stringify(validateRes, null, 2))
  })
  .catch(error => {
    console.log(error)
    process.exit(1)
  })
