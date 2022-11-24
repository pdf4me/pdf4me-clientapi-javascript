const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const expect = chai.expect
const setup = require('./utils/setup')
const files = require('./files')

const p4mClient = setup.createPdf4meClient()

describe('convert operations', () => {
  describe('convertFromPdf', () => {
    it('convertFromPdf Pdf to Word draft', async () => {
      const convertReq = {
        document: {
          docData: files.pdf2.getBase64FileContent(),
          name: 'word.pdf',
        },
        convertFromPdfAction: {
          outputFormat: 'docx',
          qualityType: 'draft',
        },
      }
      const res = await p4mClient.convertFromPdf(convertReq)
      // console.log('res.document.docData', res.document.docData)
      expect(res.document.docData).to.not.be.null
      // save file
      files.saveBase64(
        'convertFromPdf_Pdf_to_Word_draft.docx',
        res.document.docData
      )
    })

    it('convertFromPdf Pdf to PowerPoint draft', async () => {
      const convertReq = {
        document: {
          docData: files.pdf2.getBase64FileContent(),
          name: 'PowerPoint.pdf',
        },
        convertFromPdfAction: {
          outputFormat: 'pptx',
          qualityType: 'draft',
        },
      }
      const res = await p4mClient.convertFromPdf(convertReq)

      expect(res.document.docData).to.not.be.null
      // save file
      files.saveBase64(
        'convertFromPdf_Pdf_to_PowerPoint_draft.pptx',
        res.document.docData
      )
    })

    // it('convertToPdf image', async () => {
    //   const convertReq = {
    //     document: {
    //       docData: files.picture_jpg.getBase64FileContent(),
    //       name: 'image.jpg',
    //     },
    //     convertToPdfAction: {},
    //   }
    //   const res = await p4mClient.convertToPdf(convertReq)

    //   expect(res.document.docData).to.not.be.null
    //   // save file
    //   files.saveBase64('convertToPdf_image.pdf', res.document.docData)
    // })
  })

  // describe('convertToPdf async', () => {
  //   it.skip('convertToPdf async word to azure blob storage', async () => {})
  // })

  // describe('convertFileToPdf', () => {
  //   it('convertFileToPdf word with stream input', async () => {
  //     const convertRes = await p4mClient.convertFileToPdf(
  //       files.docx.getReadStream()
  //     )
  //     expect(convertRes).to.not.be.null

  //     files.saveBuffer(
  //       'convertFileToPdf_word_with_stream_input_res.pdf',
  //       convertRes
  //     )
  //   })
  //   it('convertFileToPdf word with buffer input', async () => {
  //     const convertRes = await p4mClient.convertFileToPdf({
  //       data: files.docx.getFileBuffer(),
  //       fileName: 'word.docx',
  //     })
  //     expect(convertRes).to.not.be.null

  //     files.saveBuffer(
  //       'convertFileToPdf_word_with_buffer_input_res.pdf',
  //       convertRes
  //     )
  //   })
  // })

  // describe('convertFileToPdf async', () => {
  //   it.skip('convertFileToPdf async word to azure blob storage', async () => {})
  // })
})
