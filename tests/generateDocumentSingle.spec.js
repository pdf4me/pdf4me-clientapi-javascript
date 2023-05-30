const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const expect = chai.expect
const setup = require('./utils/setup')
const files = require('./files')

const p4mClient = setup.createPdf4meClient()

describe('generate operations', () => {
  describe('generateDocumentSingle', () => {
    it('generateDocumentSingle', async () => {
      const generateDocumentSingleReq = {
        
          templateFileData: files.pdfForm.getBase64FileContent(),
          templateFileName: 'form.pdf',
          templateFileType: "Pdf",
          documentDataType : "Json",
          documentDataFile: files.pdfFormData.getBase64FileContent(),
          outputType: "Pdf"
        
      }
      const res = await p4mClient.generateDocumentSingle(generateDocumentSingleReq)
      // console.log('res.document.docData', res.document.docData)
      expect(res.Document.docData).to.not.be.null
      // save file
      files.saveBase64(
        'generateDocumentSingle_pdfform.pdf',
        res.Document.docData
      )
    })

})
})
