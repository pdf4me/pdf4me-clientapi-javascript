const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const expect = chai.expect
const setup = require('./utils/setup')
const files = require('./files')

const p4mClient = setup.createPdf4meClient()

describe('image operations', () => {
  describe('createImages', () => {
    it('createImages first 2 pages imageQuality 98', async () => {
      const createImagesReq = {
        document: {
          docData: files.pdf1.getBase64FileContent(),
        },
        imageAction: {
          pageSelection: {
            pageNrs: [1, 2],
          },
          imageQuality: 98,
          widthPixel: 1000,
          heightPixel: 1000,
          imageExtension: 'jpg',
        },
      }
      const res = await p4mClient.createImages(createImagesReq)

      expect(res.document.pages).to.not.be.null

      // save thumbnails
      res.document.pages.forEach(page => {
        files.saveBase64(
          `createImages_first_2_pages_imageQuality_98_page_${
            page.pageNumber
          }.${page.imageFormat}`,
          page.thumbnail
        )
      })
    })
  })

  describe('createThumbnail', () => {
    it('createThumbnail first page with stream input', async () => {
      const createThumbnailRes = await p4mClient.createThumbnail(
        1000,
        '1',
        'jpg',
        files.pdf1.getReadStream()
      )
      expect(createThumbnailRes).to.not.be.null

      files.saveBuffer(
        'createThumbnail_first_page_with_stream_input.jpg',
        createThumbnailRes
      )
    })

    it('createThumbnail second page with buffer input', async () => {
      const createThumbnailRes = await p4mClient.createThumbnail(
        1000,
        '1',
        'jpg',
        {
          data: files.pdf1.getFileBuffer(),
          fileName: 'word.docx',
        }
      )
      expect(createThumbnailRes).to.not.be.null

      files.saveBuffer(
        'createThumbnail_second_page_with_buffer_input.jpg',
        createThumbnailRes
      )
    })
  })

  describe('createThumbnails', () => {
    it('createThumbnails first 2 pages with stream input', async () => {
      const createThumbnailRes = await p4mClient.createThumbnails(
        1000,
        '1,2',
        'jpg',
        files.pdf1.getReadStream()
      )
      expect(createThumbnailRes).to.not.be.null

      // save thumbnails
      createThumbnailRes.forEach((thumbnail, index) => {
        files.saveBuffer(
          `createThumbnails_first_2_pages_with_stream_input_${index}.jpg`,
          thumbnail
        )
      })
    })

    it.skip('createThumbnails all pages with buffer input', async () => {
      const createThumbnailRes = await p4mClient.createThumbnails(
        1000,
        'all',
        'jpg',
        files.pdf1.getReadStream()
      )
      expect(createThumbnailRes).to.not.be.null

      // save thumbnails
      createThumbnailRes.forEach((thumbnail, index) => {
        files.saveBuffer(
          `createThumbnails_all_pages_with_buffer_input_${index}.jpg`,
          thumbnail
        )
      })
    })
  })
})
