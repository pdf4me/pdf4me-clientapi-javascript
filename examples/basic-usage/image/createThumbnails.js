const fs = require('fs')
const path = require('path')
const pdf4me = require('../../../src/index')

// create pdf4meClient
const p4mClient = pdf4me.createClient(process.env.PDF4ME_API_KEY)

// thumbnail creation
p4mClient
  .createThumbnails(2000, '1,2,3', 'png', fs.createReadStream(path.join(__dirname, 'myPdf.pdf')))
  .then(thumbnails => {
    // and writing the generated picture to disk
    thumbnails.forEach((thumbnail, index) => {
      fs.writeFileSync(path.join(__dirname, `createThumbnails_image${index + 1}_result.png`), thumbnail)
    })
  })
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
