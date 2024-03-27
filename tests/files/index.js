const fs = require('fs')
const path = require('path')
const $sh = require('shelljs')

const file = filename => {
  const fn = filename
  return {
    getReadStream: () => {
      return fs.createReadStream(path.join(__dirname, fn))
    },
    getFileBuffer: () => {
      return fs.readFileSync(path.join(__dirname, fn))
    },
    getBase64FileContent: () => {
      return fs
        .readFileSync(path.join(__dirname, fn))
        .toString('base64')
    },
  }
}

const testoutputDir = 'testoutput/files'

module.exports = {
  pdf1: file('pdf1.pdf'),
  pdf2: file('pdf2.pdf'),
  pdf_protected: file('protectedPdf.pdf'),
  text: file('txt.txt'),
  email_eml: file('email.eml'),
  email_msg: file('email.msg'),
  excel: file('excel.xls'),
  picture_jpg: file('picture.jpg'),
  docx: file('wordDoc.docx'),
  powerPoint: file('PowerPoint.pptx'),
  pdfForm: file('form.pdf'),
  pdfFormData: file('pdf_form_data.json'),
  zip: file('zip.zip'),
  barcode: file('barcode_pdf.pdf'),
  saveBase64: (filename, base64Data) => {
    const buffer = Buffer.from(base64Data, 'base64')
    fs.writeFileSync(path.join(testoutputDir, filename), buffer)
  },
  saveBuffer: (filename, buffer) => {
    fs.writeFileSync(path.join(testoutputDir, filename), buffer)
  },
  saveJson: (filename, object) => {
    fs.writeFileSync(
      path.join(testoutputDir, filename),
      JSON.stringify(object, null, 2),
      'utf8'
    )
  },
  clearTestoutput: () => {
    $sh.rm('-rf', testoutputDir.split('/')[0])
    $sh.mkdir('-p', testoutputDir)
  },
}
