const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const expect = chai.expect
const setup = require('./utils/setup')
const files = require('./files')

const p4mClient = setup.createPdf4meClient()

describe('convert operations', () => {
  describe('convertToPdf', () => {
    it('convertToPdf Word to pdfA1', async () => {
      const convertReq = {
        document: {
          docData: files.docx.getBase64FileContent(),
          name: 'word.docx',
        },
        convertToPdfAction: {
          pdfConformance: 'pdfA1',
        },
      }
      const res = await p4mClient.convertToPdf(convertReq)

      expect(res.document.docData).to.not.be.null
      // save file
      files.saveBase64(
        'convertToPdf_word_to_pdfA1.pdf',
        res.document.docData
      )
    })

    it('convertToPdf PowerPoint', async () => {
      const convertReq = {
        document: {
          docData: files.powerPoint.getBase64FileContent(),
          name: 'PowerPoint.pptx',
        },
        convertToPdfAction: {},
      }
      const res = await p4mClient.convertToPdf(convertReq)

      expect(res.document.docData).to.not.be.null
      // save file
      files.saveBase64(
        'convertToPdf_PowerPoint.pdf',
        res.document.docData
      )
    })

    it('convertToPdf image', async () => {
      const convertReq = {
        document: {
          docData: files.picture_jpg.getBase64FileContent(),
          name: 'image.jpg',
        },
        convertToPdfAction: {},
      }
      const res = await p4mClient.convertToPdf(convertReq)

      expect(res.document.docData).to.not.be.null
      // save file
      files.saveBase64('convertToPdf_image.pdf', res.document.docData)
    })
  })

  describe('convertToPdf async', () => {
    it.skip('convertToPdf async word to azure blob storage', async () => {})
  })

  describe('convertFileToPdf', () => {
    it('convertFileToPdf word with stream input', async () => {
      const convertRes = await p4mClient.convertFileToPdf(
        files.docx.getReadStream()
      )
      expect(convertRes).to.not.be.null

      files.saveBuffer(
        'convertFileToPdf_word_with_stream_input_res.pdf',
        convertRes
      )
    })
    it('convertFileToPdf word with buffer input', async () => {
      const convertRes = await p4mClient.convertFileToPdf({
        data: files.docx.getFileBuffer(),
        fileName: 'word.docx',
      })
      expect(convertRes).to.not.be.null

      files.saveBuffer(
        'convertFileToPdf_word_with_buffer_input_res.pdf',
        convertRes
      )
    })
  })

  describe('convertFileToPdf async', () => {
    it.skip('convertFileToPdf async word to azure blob storage', async () => {})
  })
})
