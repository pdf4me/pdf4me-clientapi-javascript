const httpClient = require('./utils/httpClient')
const defaultConfig = require('./config')
// clients
const convert = require('./clients/convertClient')
const extract = require('./clients/extractClient')
const image = require('./clients/imageClient')
const merge = require('./clients/mergeClient')
const optimize = require('./clients/optimizeClient')
const pdfA = require('./clients/pdfAClient')
const protect = require('./clients/protectClient')
const repair = require('./clients/repairClient')
const rotate = require('./clients/rotateClient')
const split = require('./clients/splitClient')
const stamp = require('./clients/stampClient')
const validate = require('./clients/validateClient')

module.exports = {
  createClient: (pdf4meApiKey, configuration) => {
    if (
      typeof pdf4meApiKey !== 'string' ||
      pdf4meApiKey.length < 10
    ) {
      throw new Error('Please provide a valid pdf4me api key')
    }

    const config = Object.assign(defaultConfig, configuration)

    const apiClient = httpClient(pdf4meApiKey, config)

    convertClient = convert.createClient(apiClient)
    extractClient = extract.createClient(apiClient)
    imageClient = image.createClient(apiClient)
    mergeClient = merge.createClient(apiClient)
    optimizeClient = optimize.createClient(apiClient)
    pdfAClient = pdfA.createClient(apiClient)
    protectClient = protect.createClient(apiClient)
    repairClient = repair.createClient(apiClient)
    rotateClient = rotate.createClient(apiClient)
    splitClient = split.createClient(apiClient)
    stampClient = stamp.createClient(apiClient)
    validateClient = validate.createClient(apiClient)

    return Object.assign(
      {},
      convertClient,
      extractClient,
      imageClient,
      mergeClient,
      optimizeClient,
      pdfAClient,
      protectClient,
      repairClient,
      rotateClient,
      splitClient,
      stampClient,
      validateClient
    )
  },
}
