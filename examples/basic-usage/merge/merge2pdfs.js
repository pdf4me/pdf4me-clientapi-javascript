const fs = require('fs')
const path = require('path')
const pdf4me = require('../../../src/index')

// create pdf4meClient
const pdf4me = pdf4me.createClient(process.env.PDF4ME_API_KEY)

try {
  // file as ReadStream
  const file1 = fs.createReadStream('./myFirstPdf.pdf')
  // ...or as buffer
  const file2 = {
    data: fs.readFileSync('./myFirstPdf.pdf'),
    fileName: 'myFirstPdf.pdf',
  }

  // merge2Pdfs return a buffer with the merged files
  const pdf = await p4m.mergeClient.merge2Pdfs(file1, file2)
  fs.writeFileSync('./mergedPdf.pdf', pdf)
} catch (err) {
  console.log(err)
}
