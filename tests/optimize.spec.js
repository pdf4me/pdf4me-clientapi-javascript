const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const expect = chai.expect
const setup = require('./utils/setup')
const files = require('./files')

const p4mClient = setup.createPdf4meClient()

describe('optimize operations', () => {
  describe('optimize', () => {
    it('optimize useProfile', async () => {
      const optimizeReq = {
        document: {
          docData: files.pdf1.getBase64FileContent(),
        },
        optimizeAction: {
          useProfile: true,
          profile: 'max',
        },
      }
      const res = await p4mClient.optimize(optimizeReq)

      expect(res.document.docData).to.not.be.null
      // save file
      files.saveBase64(
        'optimize_useProfile.pdf',
        res.document.docData
      )
    })
  })
  describe('optimizeByProfile', () => {
    it('optimizeByProfile max with stream input', async () => {
      const optimizeRes = await p4mClient.optimizeByProfile(
        'max',
        files.pdf1.getReadStream()
      )
      expect(optimizeRes).to.not.be.null

      files.saveBuffer(
        'optimizeByProfile_max_with_stream_input.pdf',
        optimizeRes
      )
    })

    it('optimizeByProfile print with buffer input', async () => {
      const optimizeRes = await p4mClient.optimizeByProfile('print', {
        data: files.pdf1.getFileBuffer(),
        fileName: 'pdf1.pdf',
      })
      expect(optimizeRes).to.not.be.null

      files.saveBuffer(
        'optimizeByProfile_print_with_buffer_input.pdf',
        optimizeRes
      )
    })
  })
})
