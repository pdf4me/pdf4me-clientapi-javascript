const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const expect = chai.expect
const setup = require('./utils/setup')
const files = require('./files')

const p4mClient = setup.createPdf4meClient()

describe('protect operations', () => {
  describe('protect', () => {
    it('protect with user password 123456', async () => {
      const protectReq = {
        document: {
          docData: files.pdf1.getBase64FileContent(),
        },
        protectAction: {
          userPassword: '123456',
        },
      }
      const res = await p4mClient.protect(protectReq)

      expect(res.document.docData).to.not.be.null
      // save file
      files.saveBase64(
        'protect_with_user_password_123456.pdf',
        res.document.docData
      )
    })
    it('protect with owner password 654321', async () => {
      const protectReq = {
        document: {
          docData: files.pdf1.getBase64FileContent(),
        },
        protectAction: {
          ownerPassword: '654321',
        },
      }
      const res = await p4mClient.protect(protectReq)

      expect(res.document.docData).to.not.be.null
      // save file
      files.saveBase64(
        'protect_with_owner_password_654321.pdf',
        res.document.docData
      )
    })
    it('protect with user password 123456 and owner password 654321', async () => {
      const protectReq = {
        document: {
          docData: files.pdf1.getBase64FileContent(),
        },
        protectAction: {
          userPassword: '123456',
          ownerPassword: '654321',
        },
      }
      const res = await p4mClient.protect(protectReq)

      expect(res.document.docData).to.not.be.null
      // save file
      files.saveBase64(
        'protect_with_user_password_123456_and_owner_password_654321.pdf',
        res.document.docData
      )
    })
  })

  describe('protectDocument', () => {
    it('protectDocument with password 123456', async () => {
      const protectRes = await p4mClient.protectDocument(
        '123456',
        'all',
        files.pdf1.getReadStream()
      )
      expect(protectRes).to.not.be.null

      files.saveBuffer(
        'protectDocument_with_password_123456.pdf',
        protectRes
      )
    })
  })

  describe('unlockDocument', () => {
    it('unlockDocument', async () => {
      const unlockRes = await p4mClient.unlockDocument(
        '123456',
        files.pdf_protected.getReadStream()
      )
      expect(unlockRes).to.not.be.null

      files.saveBuffer(
        'unlockDocument_with_password_123456.pdf',
        unlockRes
      )
    })
  })
})
