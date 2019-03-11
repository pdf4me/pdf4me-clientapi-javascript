const pdf4me = require('./src')
const API_TOKEN = 'abc'

const p4mClient = pdf4me.createClient(API_TOKEN)

const mergeOptions = {}

p4mClient.mergeClient.merge()
