const fs = require('fs')
const path = require('path')
const pdf4me = require('../../../src/index')

// create pdf4meClient
const pdf4meClient = pdf4me.createClient(process.env.PDF4ME_API_KEY)

// merge
pdf4meClient
  .merge2pdfs(
    fs.createReadStream(path.join(__dirname, 'myFirstPdf.pdf')),
    fs.createReadStream(path.join(__dirname, 'mySecondPdf.pdf'))
  )
  .then(pdf => {
    // and writing the generated PDF to disk
    fs.writeFileSync(path.join(__dirname, 'merge2pdfs_result.pdf'), pdf)
  })
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
