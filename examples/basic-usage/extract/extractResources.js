const fs = require('fs')
const path = require('path')
const pdf4me = require('../../../src/index')

// create pdf4meClient
const pdf4meClient = pdf4me.createClient(process.env.PDF4ME_API_KEY)

// create extract object
const extractResourcesReq = {
  // document
  document: {
    docData: fs.readFileSync(path.join(__dirname, 'myPdf.pdf')).toString('base64'),
  },
  // action
  extractResourcesAction: {
    extractFonts: true,
    extractImages: true,
    listFonts: true,
    listImages: true,
    outlines: true,
    xmpMetadata: true,
  },
}

// extract resources
pdf4meClient
  .extractResources(extractResourcesReq)
  .then(function(extractResourcesRes) {
    // and writing it to disk as json
    fs.writeFileSync(path.join(__dirname, 'extractResources_result.json'), JSON.stringify(extractResourcesRes, null, 2))
  })
  .catch(error => {
    console.log(error)
    process.exit(1)
  })
