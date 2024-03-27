const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const expect = chai.expect
const setup = require('./utils/setup')
const files = require('./files')

const p4mClient = setup.createPdf4meClient()

describe('split operations', () => {
  describe('split', () => {
    it('split splitAfterPage 2', async () => {
      const splitReq = {
        document: { docData: files.pdf1.getBase64FileContent() },
        splitAction: {
          splitAfterPage: 2,
        },
      }
      const splitRes = await p4mClient.split(splitReq)
      expect(splitRes.documents).to.not.be.null
      expect(splitRes.documents.length).to.be.equal(2)
      // save file
      files.saveBase64(
        'split_splitAfterPage_2_file_1.pdf',
        splitRes.documents[0].docData
      )
      files.saveBase64(
        'split_splitAfterPage_2_file_2.pdf',
        splitRes.documents[1].docData
      )
    })
    it('split splitSequence 1 3', async () => {
      const splitReq = {
        document: { docData: files.pdf1.getBase64FileContent() },
        splitAction: {
          splitSequence: [1, 3],
        },
      }
      const splitRes = await p4mClient.split(splitReq)
      expect(splitRes.documents).to.not.be.null
      expect(splitRes.documents.length).to.be.equal(3)
      // save file
      files.saveBase64(
        'split_splitSequence_1_3_file_1.pdf',
        splitRes.documents[0].docData
      )
      files.saveBase64(
        'split_splitSequence_1_3_file_2.pdf',
        splitRes.documents[1].docData
      )
      files.saveBase64(
        'split_splitSequence_1_3_file_3.pdf',
        splitRes.documents[2].docData
      )
    })
  })
  describe('splitByPageNr', () => {
    it('splitByPageNr 2 with stream input', async () => {
      const splitRes = await p4mClient.splitByPageNr(
        2,
        files.pdf1.getReadStream()
      )
      expect(splitRes).to.not.be.null
      expect(splitRes.length).to.be.equals(2)

      files.saveBuffer(
        'splitByPageNr_2_with_stream_input_file_1.pdf',
        splitRes[0]
      )

      files.saveBuffer(
        'splitByPageNr_2_with_stream_input_file_2.pdf',
        splitRes[1]
      )
    })
  })
  describe('splitRecurring', () => {
    it('splitRecurring after 5 pages with stream input', async () => {
      const splitRes = await p4mClient.splitRecurring(
        5,
        files.pdf1.getReadStream()
      )
      expect(splitRes).to.not.be.null
      expect(splitRes.length).to.be.greaterThan(1)

      splitRes.forEach((file, index) => {
        files.saveBuffer(
          `splitRecurring_after_5_pages_with_stream_input_file_${index +
            1}.pdf`,
          file
        )
      })
    })
  }),
    describe('splitByText', () => {
      it('split by text lorem', async () => {
        const splitReq = {
          document: { docData: files.pdf1.getBase64FileContent() },
          splitByTextAction: {
            text: 'Lorem',
            splitTextPage: 'before',
            combinePagesWithSameConsecutiveText: false,
          },
        }
        const splitRes = await p4mClient.splitByText(splitReq)
        expect(splitRes.documents).to.not.be.null
        expect(splitRes.documents.length).to.be.greaterThan(1)
        // save file
        files.saveBase64(
          'splitByText_splitSequence_1_file_1.pdf',
          splitRes.documents[0].docData
        )
        files.saveBase64(
          'splitByText_splitSequence_2_file_1.pdf',
          splitRes.documents[1].docData
        )
      })
    }),
    describe('splitByBarcode', () => {
      it('split by Barcode', async () => {
        const splitReq = {
          document: { docData: files.barcode.getBase64FileContent() },
          splitByBarcodeAction: {
            barcodeString: 'ara',
            barcodeFilter: 'startsWith',
            barcodeType: 'any',
            splitBarcodePage: 'before',
            pdfRenderDpi: 150,
            combinePagesWithSameConsecutiveBarcodes: false,
          },
        }
        const splitRes = await p4mClient.splitByBarcode(splitReq)
        expect(splitRes.splittedDocuments).to.not.be.null
        expect(splitRes.splittedDocuments.length).to.be.greaterThan(1)
        // save file
        files.saveBase64(
          'splitByBarcode_splitSequence_1_file_1.pdf',
          splitRes.splittedDocuments[0].docData
        )
        files.saveBase64(
          'splitByBarcode_splitSequence_2_file_1.pdf',
          splitRes.splittedDocuments[1].docData
        )
      })
    })
})
