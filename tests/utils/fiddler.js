const HttpsProxyAgent = require('https-proxy-agent')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0

const agent = new HttpsProxyAgent('http://127.0.0.1:8888')

module.exports = agent
