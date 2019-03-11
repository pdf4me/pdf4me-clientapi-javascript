const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const expect = chai.expect
const setup = require('./utils/setup')
const files = require('./files')

const p4mClient = setup.createPdf4meClient()

describe('merge operations', () => {
  describe('merge', () => {
    it('merge 2 files', async () => {
      const mergeReq = {
        documents: [
          { docData: files.pdf1.getBase64FileContent() },
          { docData: files.pdf2.getBase64FileContent() },
        ],
        mergeAction: {},
      }
      const mergeRes = await p4mClient.merge(mergeReq)
      expect(mergeRes.document.docData).to.not.be.null
      // save file
      files.saveBase64('merge_2_files.pdf', mergeRes.document.docData)
    })
  })

  describe('merge2pdfs', () => {
    it('merge2pdfs with stream input', async () => {
      const mergeRes = await p4mClient.merge2pdfs(
        files.pdf1.getReadStream(),
        files.pdf2.getReadStream()
      )
      expect(mergeRes).to.not.be.null

      files.saveBuffer(
        'merge2pdfs_with_stream_input_res.pdf',
        mergeRes
      )
    })

    it('merge2pdfs with buffer input', async () => {
      const mergeRes = await p4mClient.merge2pdfs(
        {
          data: files.pdf1.getFileBuffer(),
          contentType: 'application/pdf',
          fileName: 'pdf1.pdf',
        },
        {
          data: files.pdf2.getFileBuffer(),
          contentType: 'application/pdf',
          fileName: 'pdf2.pdf',
        }
      )
      expect(mergeRes).to.not.be.null

      files.saveBuffer(
        'merge2pdfs_with_buffer_input_res.pdf',
        mergeRes
      )
    })
  })
})
