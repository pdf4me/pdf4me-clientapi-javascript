const fs = require('fs')
const path = require('path')
const pdf4me = require('../../../src/index')

// setup the pdf4meClient
const pdf4meClient = pdf4me.createClient(process.env.PDF4ME_API_KEY)

// create the createImages object
const createImagesReq = {
  // document
  document: {
    docData: fs.readFileSync(path.join(__dirname, 'myPdf.pdf')).toString('base64'),
  },
  // action
  imageAction: {
    pageSelection: {
      pageNrs: [1, 2, 3],
    },
    imageQuality: 99,
    widthPixel: 2000,
    heightPixel: 2000,
    imageExtension: 'jpg',
  },
}

// create images
pdf4meClient
  .createImages(createImagesReq)
  .then(createImagesRes => {
    // extract thumbnail and writing it to disk
    createImagesRes.document.pages.forEach((page, index) => {
      const image = Buffer.from(page.thumbnail, 'base64')
      fs.writeFileSync(path.join(__dirname, `createImages_image${index + 1}_result.jpg`), image)
    })
  })
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
