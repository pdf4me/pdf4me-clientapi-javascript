const fs = require('fs')
const path = require('path')
const pdf4me = require('../../../src/index')

// create pdf4meClient
const pdf4me = pdf4me.createClient(process.env.PDF4ME_API_KEY)
