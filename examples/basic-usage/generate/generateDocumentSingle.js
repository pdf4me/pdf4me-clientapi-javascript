const fs = require('fs')
const path = require('path')
const pdf4me = require('../../../src/index')

// create pdf4meClient
console.log('process.env.PDF4ME_API_KEY ' + process.env.PDF4ME_API_KEY)
const pdf4meClient = pdf4me.createClient(process.env.PDF4ME_API_KEY)

const generateDocumentSingleReq = {
        
  templateFileData: fs.readFileSync(path.join(__dirname, 'form.pdf')).toString('base64'),
  templateFileName: 'form.pdf',
  templateFileType: "Pdf",
  documentDataType : "Json",
  documentDataFile: fs.readFileSync(path.join(__dirname, 'pdf_form_data.json')).toString('base64'),
  outputType: "Pdf"

}

// conversion
pdf4meClient
  .generateDocumentSingle(generateDocumentSingleReq)
  .then(function(generateDocumentSingleRes) {
    // and writing the generated PDF to disk

    console.log(generateDocumentSingleRes.Document)
    const pdfDocument = Buffer.from(generateDocumentSingleRes.Document.docData, 'base64')
    
    fs.writeFileSync(path.join(__dirname, 'generateDocumentSingle_result.pdf'), pdfDocument)
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
