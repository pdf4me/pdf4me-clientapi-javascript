const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const expect = chai.expect
const setup = require('./utils/setup')
const files = require('./files')

const p4mClient = setup.createPdf4meClient()

describe('extract operations', () => {
  describe('extract', () => {
    it('extract first page', async () => {
      const extractReq = {
        document: {
          docData: files.pdf1.getBase64FileContent(),
        },
        extractAction: {
          extractPages: [1],
        },
      }
      const res = await p4mClient.extract(extractReq)

      expect(res.document.docData).to.not.be.null
      // save file
      files.saveBase64('extract_first_page.pdf', res.document.docData)
    })
    it('extract first 3 pages in reverse order', async () => {
      const extractReq = {
        document: {
          docData: files.pdf1.getBase64FileContent(),
        },
        extractAction: {
          extractPages: [3, 2, 1],
        },
      }
      const res = await p4mClient.extract(extractReq)

      expect(res.document.docData).to.not.be.null
      // save file
      files.saveBase64(
        'extract_first_3_pages_in_reverse_order.pdf',
        res.document.docData
      )
    })
  })
  describe('extractResources', () => {
    it('extractResources all', async () => {
      const extractResourcesReq = {
        document: {
          docData: files.pdf1.getBase64FileContent(),
        },
        extractResourcesAction: {
          extractFonts: true,
          extractImages: true,
          listFonts: true,
          listImages: true,
          outlines: true,
          xmpMetadata: true,
        },
      }
      const res = await p4mClient.extractResources(
        extractResourcesReq
      )

      expect(res.pdfResources.DocMetadata).to.not.be.undefined
      expect(res.pdfResources.outlines).to.not.be.undefined
      expect(res.pdfResources.xmpMetadata).to.not.be.undefined
      // save file
      files.saveJson('extractResources_all.json', res.pdfResources)
    })
  })
  describe('extractPages', () => {
    it('extractPages first 2 pages with stream input', async () => {
      const extractRes = await p4mClient.extractPages(
        '1,2',
        files.pdf1.getReadStream()
      )
      expect(extractRes).to.not.be.null

      files.saveBuffer(
        'extractPages_first_2_pages_with_stream_input.pdf',
        extractRes
      )
    })
    it('extractPages first 3 pages with buffer input in reverse order', async () => {
      const extractRes = await p4mClient.extractPages(
        '3,2,1',
        files.pdf1.getReadStream()
      )
      expect(extractRes).to.not.be.null

      files.saveBuffer(
        'extractPages_first_3_pages_with_buffer_input_in_reverse_order.pdf',
        extractRes
      )
    })
  })
  describe('metadata', () => {
    it('metadata with stream input', async () => {
      const metadataRes = await p4mClient.metadata(
        files.pdf1.getReadStream()
      )
      expect(metadataRes).to.not.be.null

      files.saveJson('metadata_with_stream_input.json', metadataRes)
    })
  })
})
