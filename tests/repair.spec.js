const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const expect = chai.expect
const setup = require('./utils/setup')
const files = require('./files')

const p4mClient = setup.createPdf4meClient()

describe('repair operations', () => {
  describe('repair', () => {
    it('repair all', async () => {
      const repairReq = {
        document: { docData: files.pdf1.getBase64FileContent() },
        repairAction: {
          analyzeOnly: false,
          recoverPages: true,
          recoverXREF: true,
          rebuildFonts: true,
          rebuildFontsAsType1: true,
          rebuildStreams: true,
        },
      }
      const repairRes = await p4mClient.repair(repairReq)
      expect(repairRes.document.docData).to.not.be.null
      // save file
      files.saveBase64('repair_all.pdf', repairRes.document.docData)
    })
    it('repair analyzeOnly', async () => {
      const repairReq = {
        document: { docData: files.pdf1.getBase64FileContent() },
        repairAction: {
          analyzeOnly: true,
          recoverPages: true,
          recoverXREF: true,
          rebuildFonts: true,
          rebuildFontsAsType1: true,
          rebuildStreams: true,
        },
      }
      const repairRes = await p4mClient.repair(repairReq)
      expect(repairRes).to.not.be.null
      // save file
      files.saveJson('repair_analyzeOnly.json', repairRes)
    })
  })

  describe('repairDocument', () => {
    it('repairDocument with stream input', async () => {
      const repairRes = await p4mClient.repairDocument(
        files.pdf1.getReadStream()
      )
      expect(repairRes).to.not.be.null

      files.saveBuffer(
        'repairDocument_with_stream_input.pdf',
        repairRes
      )
    })
    it('repairDocument with buffer input', async () => {
      const repairRes = await p4mClient.repairDocument({
        data: files.pdf1.getFileBuffer(),
        fileName: 'pdf1.pdf',
      })
      expect(repairRes).to.not.be.null
      files.saveBuffer(
        'repairDocument_with_buffer_input.pdf',
        repairRes
      )
    })
  })
})
