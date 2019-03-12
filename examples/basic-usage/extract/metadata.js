const fs = require('fs')
const path = require('path')
const pdf4me = require('../../../src/index')

// create pdf4meClient
const pdf4meClient = pdf4me.createClient(process.env.PDF4ME_API_KEY)

// metadata
pdf4meClient
  .metadata(fs.createReadStream(path.join(__dirname, 'myPdf.pdf')))
  .then(metadata => {
    // and writing it to disk as json
    fs.writeFileSync(path.join(__dirname, 'metadata_result.json'), JSON.stringify(metadata, null, 2))
  })
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
