const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const expect = chai.expect
const setup = require('./utils/setup')
const files = require('./files')

const p4mClient = setup.createPdf4meClient()

describe('rotate operations', () => {
  describe('rotate', () => {
    it('rotate page 1 clockwise page 2 counterClockwise page 3 upsideDown', async () => {
      const rotateReq = {
        document: { docData: files.pdf1.getBase64FileContent() },
        rotateAction: {
          rotationList: [
            {
              pageNr: 1,
              rotationType: 'clockwise',
            },
            {
              pageNr: 2,
              rotationType: 'counterClockwise',
            },
            {
              pageNr: 3,
              rotationType: 'upsideDown',
            },
          ],
        },
      }
      const rotateRes = await p4mClient.rotate(rotateReq)
      expect(rotateRes.document.docData).to.not.be.null
      // save file
      files.saveBase64(
        'rotate_page_1_clockwise_page_2_counterClockwise_page_3_upsideDown.pdf',
        rotateRes.document.docData
      )
    })
  })
  describe('rotateDocument', () => {
    it('rotateDocument clockwise with stream input', async () => {
      const rotateRes = await p4mClient.rotateDocument(
        'clockwise',
        files.pdf1.getReadStream()
      )
      expect(rotateRes).to.not.be.null

      files.saveBuffer(
        'rotateDocument_clockwise_with_stream_input.pdf',
        rotateRes
      )
    })
    it('rotateDocument counterClockwise with buffer input', async () => {
      const rotateRes = await p4mClient.rotateDocument(
        'counterClockwise',
        {
          data: files.pdf1.getFileBuffer(),
          fileName: 'pdf1.pdf',
        }
      )
      expect(rotateRes).to.not.be.null
      files.saveBuffer(
        'rotateDocument_counterClockwise_with_buffer_input.pdf',
        rotateRes
      )
    })
  })
  describe('rotatePage', () => {
    it('rotatePage first page clockwise with stream input', async () => {
      const rotateRes = await p4mClient.rotatePage(
        '1',
        'clockwise',
        files.pdf1.getReadStream()
      )
      expect(rotateRes).to.not.be.null
      files.saveBuffer(
        'rotatePage_first_page_clockwise_with_stream_input.pdf',
        rotateRes
      )
    })
    it('rotatePage first page counterClockwise with buffer input', async () => {
      const rotateRes = await p4mClient.rotatePage(
        '1',
        'counterClockwise',
        {
          data: files.pdf1.getFileBuffer(),
          fileName: 'pdf1.pdf',
        }
      )
      expect(rotateRes).to.not.be.null
      files.saveBuffer(
        'rotatePage_first_page_counterClockwise_with_buffer_input.pdf',
        rotateRes
      )
    })
    it('rotatePage first page upsideDown with buffer input', async () => {
      const rotateRes = await p4mClient.rotatePage(
        '1',
        'upsideDown',
        {
          data: files.pdf1.getFileBuffer(),
          fileName: 'pdf1.pdf',
        }
      )
      expect(rotateRes).to.not.be.null
      files.saveBuffer(
        'rotatePage_first_page_upsideDown_with_buffer_input.pdf',
        rotateRes
      )
    })
  })
})
