const $sh = require('shelljs')
const readlineSync = require('readline-sync')

// check if api key is available
if (!$sh.test('-f', './api-key.js')) {
  console.log(
    'before you can execute the samples you must create a file api-key.js in the project root'
  )
  console.log(
    "copy the following content to the file and replace 'your api key' with your personal api key"
  )
  console.log('')
  console.log('// ---- api-key.js ----')
  console.log('')
  console.log("module.exports = 'your api key'")
  console.log('')
  console.log('// ---- end file ----')
  console.log('')
  return -1
}

const apiKey = require('../api-key.js')
process.env.PDF4ME_API_KEY = apiKey

const examples = [
  {
    name: 'convertToPdf',
    path: './examples/basic-usage/convert/convertToPdf.js',
    output: [
      './examples/basic-usage/convert/convertToPdf_result.pdf',
    ],
  },
  {
    name: 'convertFileToPdf',
    path: './examples/basic-usage/convert/convertFileToPdf.js',
    output: [
      './examples/basic-usage/convert/convertFileToPdf_result.pdf',
    ],
  },
]

let cmdIndex = 0

while (cmdIndex >= 0) {
  cmdIndex = readlineSync.keyInSelect(
    examples.map(example => example.name),
    'select example to run'
  )
  const example = examples[cmdIndex]
  if (example) {
    const example = examples[cmdIndex]
    console.log('run example: ' + example.name)
    const startTime = new Date().getTime()
    const res = $sh.exec(`node ${example.path}`)
    const endTime = new Date().getTime()
    const duration = endTime - startTime
    console.log('duration: ' + duration + 'ms')
    if (res.code === 0) {
      example.output.forEach(file => {
        $sh.exec('"' + file + '"')
      })
    }
  }
}
