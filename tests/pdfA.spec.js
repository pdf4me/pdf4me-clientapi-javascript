const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const expect = chai.expect
const setup = require('./utils/setup')
const files = require('./files')

const p4mClient = setup.createPdf4meClient()

describe('pdfA operations', () => {
  describe('pdfA', () => {
    it('pdfA pdfA1b', async () => {
      const pdfAReq = {
        document: {
          docData: files.pdf1.getBase64FileContent(),
        },
        pdfAAction: {
          compliance: 'pdfA1b',
        },
      }

      const res = await p4mClient.pdfA(pdfAReq)

      expect(res.document.docData).to.not.be.null

      // save file
      files.saveBase64('pdfA_pdfA1b.pdf', res.document.docData)
    })
  })
  describe('createPdfA', () => {
    it('createPdfA pdfA1b with stream input', async () => {
      const pdfARes = await p4mClient.createPdfA(
        'pdfA1b',
        files.pdf1.getReadStream()
      )
      expect(pdfARes).to.not.be.null

      files.saveBuffer(
        'createPdfA_pdfA1b_with_stream_input.pdf',
        pdfARes
      )
    })
    it('createPdfA pdfA1a with buffer input', async () => {
      const pdfARes = await p4mClient.createPdfA('pdfA1a', {
        data: files.pdf1.getFileBuffer(),
        fileName: 'pdf1.pdf',
      })
      expect(pdfARes).to.not.be.null

      files.saveBuffer(
        'createPdfA_pdfA1a_with_buffer_input.pdf',
        pdfARes
      )
    })
  })
})
