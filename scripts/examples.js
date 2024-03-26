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
    name: 'splitByBarcode',
    path: './examples/basic-usage/barcode/splitByBarcode.js',
    output: [
      './examples/basic-usage/barcode/splitByBarcode_pdf1_result.pdf',
      './examples/basic-usage/barcode/splitByBarcode_pdf2_result.pdf',
    ],
  },
  {
    name: 'split',
    path: './examples/basic-usage/split/split.js',
    output: [
      './examples/basic-usage/split/split_pdf1_result.pdf',
      './examples/basic-usage/split/split_pdf2_result.pdf',
    ],
  },
  {
    name: 'splitByText',
    path: './examples/basic-usage/split/splitByText.js',
    output: [
      './examples/basic-usage/split/splitByText_pdf1_result.pdf',
      './examples/basic-usage/split/splitByText_pdf2_result.pdf',
    ],
  },
  {
    name: 'splitByPageNr',
    path: './examples/basic-usage/split/splitByPageNr.js',
    output: [
      './examples/basic-usage/split/splitByPageNr_pdf1_result.pdf',
      './examples/basic-usage/split/splitByPageNr_pdf2_result.pdf',
    ],
  },
  {
    name: 'splitRecurring',
    path: './examples/basic-usage/split/splitRecurring.js',
    output: [
      './examples/basic-usage/split/splitRecurring_pdf1_result.pdf',
      './examples/basic-usage/split/splitRecurring_pdf2_result.pdf',
      './examples/basic-usage/split/splitRecurring_pdf3_result.pdf',
    ],
  },
  {
    name: 'merge',
    path: './examples/basic-usage/merge/merge.js',
    output: ['./examples/basic-usage/merge/merge_result.pdf'],
  },
  {
    name: 'merge2pdfs',
    path: './examples/basic-usage/merge/merge2pdfs.js',
    output: ['./examples/basic-usage/merge/merge2pdfs_result.pdf'],
  },
  {
    name: 'createImages',
    path: './examples/basic-usage/image/createImages.js',
    output: [
      './examples/basic-usage/image/createImages_image1_result.jpg',
      './examples/basic-usage/image/createImages_image2_result.jpg',
      './examples/basic-usage/image/createImages_image3_result.jpg',
    ],
  },
  {
    name: 'createThumbnail',
    path: './examples/basic-usage/image/createThumbnail.js',
    output: [
      './examples/basic-usage/image/createThumbnail_result.png',
    ],
  },
  {
    name: 'createThumbnails',
    path: './examples/basic-usage/image/createThumbnails.js',
    output: [
      './examples/basic-usage/image/createThumbnails_image1_result.png',
      './examples/basic-usage/image/createThumbnails_image2_result.png',
      './examples/basic-usage/image/createThumbnails_image3_result.png',
    ],
  },
  {
    name: 'extract',
    path: './examples/basic-usage/extract/extract.js',
    output: ['./examples/basic-usage/extract/extract_result.pdf'],
  },
  {
    name: 'extractPages',
    path: './examples/basic-usage/extract/extractPages.js',
    output: [
      './examples/basic-usage/extract/extractPages_result.pdf',
    ],
  },
  {
    name: 'extractResources',
    path: './examples/basic-usage/extract/extractResources.js',
    output: [
      './examples/basic-usage/extract/extractResources_result.json',
    ],
  },
  {
    name: 'metadata',
    path: './examples/basic-usage/extract/metadata.js',
    output: ['./examples/basic-usage/extract/metadata_result.json'],
  },
  {
    name: 'rotate',
    path: './examples/basic-usage/rotate/rotate.js',
    output: ['./examples/basic-usage/rotate/rotate_result.pdf'],
  },
  {
    name: 'rotateDocument',
    path: './examples/basic-usage/rotate/rotateDocument.js',
    output: [
      './examples/basic-usage/rotate/rotateDocument_result.pdf',
    ],
  },
  {
    name: 'rotatePage',
    path: './examples/basic-usage/rotate/rotatePage.js',
    output: ['./examples/basic-usage/rotate/rotatePage_result.pdf'],
  },
  {
    name: 'optimize',
    path: './examples/basic-usage/optimize/optimize.js',
    output: ['./examples/basic-usage/optimize/optimize_result.pdf'],
  },
  {
    name: 'optimizeByProfile',
    path: './examples/basic-usage/optimize/optimizeByProfile.js',
    output: [
      './examples/basic-usage/optimize/optimizeByProfile_result.pdf',
    ],
  },
  {
    name: 'protect',
    path: './examples/basic-usage/protect/protect.js',
    output: ['./examples/basic-usage/protect/protect_result.pdf'],
  },
  {
    name: 'protectDocument',
    path: './examples/basic-usage/protect/protectDocument.js',
    output: [
      './examples/basic-usage/protect/protectDocument_result.pdf',
    ],
  },
  {
    name: 'unlockDocument',
    path: './examples/basic-usage/protect/unlockDocument.js',
    output: [
      './examples/basic-usage/protect/unlockDocument_result.pdf',
    ],
  },
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
  {
    name: 'validate',
    path: './examples/basic-usage/validate/validate.js',
    output: ['./examples/basic-usage/validate/validate_result.json'],
  },
  {
    name: 'validateDocument',
    path: './examples/basic-usage/validate/validateDocument.js',
    output: [
      './examples/basic-usage/validate/validateDocument_result.json',
    ],
  },
  {
    name: 'pdfA',
    path: './examples/basic-usage/pdfA/pdfA.js',
    output: ['./examples/basic-usage/pdfA/pdfA_result.pdf'],
  },
  {
    name: 'createPdfA',
    path: './examples/basic-usage/pdfA/createPdfA.js',
    output: ['./examples/basic-usage/pdfA/createPdfA_result.pdf'],
  },
  {
    name: 'repair',
    path: './examples/basic-usage/repair/repair.js',
    output: ['./examples/basic-usage/repair/repair_result.pdf'],
  },
  {
    name: 'repairDocument',
    path: './examples/basic-usage/repair/repairDocument.js',
    output: [
      './examples/basic-usage/repair/repairDocument_result.pdf',
    ],
  },
  {
    name: 'stamp',
    path: './examples/basic-usage/stamp/stamp.js',
    output: ['./examples/basic-usage/stamp/stamp_result.pdf'],
  },
  {
    name: 'textStamp',
    path: './examples/basic-usage/stamp/textStamp.js',
    output: ['./examples/basic-usage/stamp/textStamp_result.pdf'],
  },
  {
    name: 'generateDocumentSingle',
    path: './examples/basic-usage/generate/generateDocumentSingle.js',
    output: ['./examples/basic-usage/generate/generateDocumentSingle.pdf'],
  }
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
        console.log(file)
        $sh.exec('"' + file + '"')
      })
    }
  }
}
