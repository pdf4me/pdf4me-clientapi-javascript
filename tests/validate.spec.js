const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const expect = chai.expect
const setup = require('./utils/setup')
const files = require('./files')

const p4mClient = setup.createPdf4meClient()

describe('validate operations', () => {
  describe('validate', () => {
    it('validate pdfA1b', async () => {
      const validateReq = {
        document: { docData: files.pdf1.getBase64FileContent() },
        validateAction: {
          pdfConformance: 'pdfA1b',
        },
      }
      const validateRes = await p4mClient.validate(validateReq)
      expect(validateRes).to.not.be.null
      // save file
      files.saveJson('validate_pdfA1b.json', validateRes)
    })
  })
  describe('validateDocument', () => {
    it('validateDocument pdfA1b with stream input', async () => {
      const validateRes = await p4mClient.validateDocument(
        'pdfA1b',
        files.pdf1.getReadStream()
      )
      expect(validateRes).to.not.be.null

      files.saveJson(
        'validateDocument_pdfA1b_with_stream_input.json',
        validateRes
      )
    })
  })
})
