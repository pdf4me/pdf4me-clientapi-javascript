const chai = require('chai')
const pdf4me = require('../src')
const config = require('./utils/config')
const expect = chai.expect

describe('pdf4me Client', () => {
  it('create pdf4me client without api key', () => {
    expect(pdf4me.createClient.bind(pdf4me, null)).to.throw(
      'Please provide a valid pdf4me api key'
    )
  })

  it('pdf4me client api', () => {
    const p4m = pdf4me.createClient(config.apiKey)
    expect(p4m).to.not.be.null

    // convertClient
    expect(p4m.convertToPdf).to.be.a('function')
    expect(p4m.convertFileToPdf).to.be.a('function')

    // extractClient
    expect(p4m.extract).to.be.a('function')
    expect(p4m.extractResources).to.be.a('function')
    expect(p4m.extractPages).to.be.a('function')
    expect(p4m.metadata).to.be.a('function')

    // imageClient
    expect(p4m.createImages).to.be.a('function')
    expect(p4m.createThumbnail).to.be.a('function')
    expect(p4m.createThumbnails).to.be.a('function')

    // mergeClient
    expect(p4m.merge).to.be.a('function')
    expect(p4m.merge2pdfs).to.be.a('function')

    // optimizeClient
    expect(p4m.optimize).to.be.a('function')
    expect(p4m.optimizeByProfile).to.be.a('function')

    // pdfAClient
    expect(p4m.pdfA).to.be.a('function')
    expect(p4m.createPdfA).to.be.a('function')

    // protectClient
    expect(p4m.protect).to.be.a('function')
    expect(p4m.protectDocument).to.be.a('function')
    expect(p4m.unlockDocument).to.be.a('function')

    // repairClient
    expect(p4m.repair).to.be.a('function')
    expect(p4m.repairDocument).to.be.a('function')

    // rotateClient
    expect(p4m.rotate).to.be.a('function')
    expect(p4m.rotateDocument).to.be.a('function')
    expect(p4m.rotatePage).to.be.a('function')

    // splitClient
    expect(p4m.split).to.be.a('function')
    expect(p4m.splitByPageNr).to.be.a('function')
    expect(p4m.splitRecurring).to.be.a('function')

    // stampClient
    expect(p4m.stamp).to.be.a('function')
    expect(p4m.textStamp).to.be.a('function')

    // validateClient
    expect(p4m.validate).to.be.a('function')
    expect(p4m.validateDocument).to.be.a('function')
  })
})
