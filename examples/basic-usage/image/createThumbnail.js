const fs = require('fs')
const path = require('path')
const pdf4me = require('../../../src/index')

// create pdf4meClient
const p4mClient = pdf4me.createClient(process.env.PDF4ME_API_KEY)

// thumbnail creation
p4mClient
  .createThumbnail(2000, '1', 'png', fs.createReadStream(path.join(__dirname, 'myPdf.pdf')))
  .then(thumbnail => {
    // and writing the generated picture to disk
    fs.writeFileSync(path.join(__dirname, 'createThumbnail_result.png'), thumbnail)
  })
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
