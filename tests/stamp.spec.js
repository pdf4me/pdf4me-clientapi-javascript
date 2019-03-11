const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const expect = chai.expect
const setup = require('./utils/setup')
const files = require('./files')

const p4mClient = setup.createPdf4meClient()

describe('stamp operations', () => {
  describe('stamp', () => {
    it('stamp text stamp all pages', async () => {
      const stampReq = {
        document: {
          docData: files.pdf1.getBase64FileContent(),
        },
        stampAction: {
          text: {
            value: 'EXAMPLE TEXT',
            size: 55,
            color: { red: 0.5, green: 0.5, blue: 0 },
          },
          alpha: 0.25,
          rotate: -52,
          pageSequence: 'all',
          stampType: 'foreground',
          alignX: 'center',
          alignY: 'middle',
        },
      }
      const res = await p4mClient.stamp(stampReq)

      expect(res.document.docData).to.not.be.null
      // save file
      files.saveBase64(
        'stamp_text_stamp_all_pages.pdf',
        res.document.docData
      )
    })
    it.skip('stamp image stamp on page 1', async () => {})
  })
  describe('textStamp', () => {
    it.skip('textStamp all pages bottom right', async () => {
      const stampRes = await p4mClient.textStamp(
        'Created with pdf4me',
        'all',
        'right',
        'bottom',
        files.docx.getReadStream()
      )
      expect(stampRes).to.not.be.null

      files.saveBuffer(
        'textStamp_all_pages_bottom_right_with_stream_input.pdf',
        stampRes
      )
    })
  })
})
