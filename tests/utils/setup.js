if (!process.env.PDF4ME_API_KEY) {
  require('dotenv').config()
}

const pdf4me = require('../../src')
const files = require('../files')
const config = require('./config')

if (!config.apiKey) {
  console.error('missing process.env.PDF4ME_API_KEY')
  process.exit(1)
}

if (!config.options.apiHost) {
  console.error('missing process.env.PDF4ME_API_HOST')
  process.exit(1)
}

if (process.env.USE_FIDDLER) {
  config.options.agent = require('./fiddler')
}

let p4mClient = null
files.clearTestoutput()

console.log('start test')
console.log('PDF4ME_API_HOST: ' + process.env.PDF4ME_API_HOST)
console.log(
  'PDF4ME_API_KEY: ' +
    process.env.PDF4ME_API_KEY.substring(0, 8) +
    '*********'
)

module.exports = {
  createPdf4meClient: () => {
    if (!p4mClient) {
      p4mClient = pdf4me.createClient(config.apiKey, config.options)
    }
    return p4mClient
  },
}
