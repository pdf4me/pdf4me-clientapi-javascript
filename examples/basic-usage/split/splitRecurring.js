const fs = require('fs')
const path = require('path')
const pdf4me = require('../../../src/index')

// create pdf4meClient
const pdf4meClient = pdf4me.createClient(process.env.PDF4ME_API_KEY)

// split the PDF
pdf4meClient
  .splitRecurring(5, fs.createReadStream(path.join(__dirname, 'myPdf.pdf')))
  .then(splitRes => {
    // and writing the resulting PDFs to disk
    splitRes.forEach((pdf, index) => {
      fs.writeFileSync(path.join(__dirname, `splitRecurring_pdf${index + 1}_result.pdf`), pdf)
    })
  })
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
