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
  splitByTextAction: {
    text: "Lorem",
    splitTextPage: "before",
    combinePagesWithSameConsecutiveText: false,
  },


}

// split
pdf4meClient
  .splitByText(splitReq)
  .then((splitRes) => {
    const length = splitRes?.documents?.length || 0;
    if (length) {
      if (length >= 2) {
        const pdf1 = Buffer.from(splitRes.documents[0].docData, 'base64')
        const pdf2 = Buffer.from(splitRes.documents[1].docData, 'base64')
        fs.writeFileSync(path.join(__dirname, 'splitByText_pdf1_result.pdf'), pdf1)
        fs.writeFileSync(path.join(__dirname, 'splitByText_pdf2_result.pdf'), pdf2)
      } else {
        const pdf = Buffer.from(splitRes.documents[0].docData, 'base64')
        fs.writeFileSync(path.join(__dirname, 'splitByText_pdf1_result.pdf'), pdf)
      }
    }
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
