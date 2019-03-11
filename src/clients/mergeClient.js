const FormData = require('form-data')

const appendFile = (form, name, bufferOrStream) => {
  if (bufferOrStream.data instanceof Buffer) {
    form.append(name, bufferOrStream.data, {
      filename: bufferOrStream.fileName,
    })
  } else {
    form.append(name, bufferOrStream)
  }
}

module.exports = {
  createClient: apiClient => {
    const api = apiClient
    return {
      merge: mergeReq => {
        return new Promise((resolve, reject) => {
          api
            .postJson('/Merge/Merge', mergeReq)
            .then(res => {
              resolve(res)
            })
            .catch(error => {
              reject(error)
            })
        })
      },
      merge2pdfs: (file1, file2, integrationConfig = {}) => {
        return new Promise((resolve, reject) => {
          const data = {
            file1,
            file2,
            integrationConfig: JSON.stringify(integrationConfig),
          }

          api
            .postFormData('/Merge/Merge2Pdfs  ', data)
            .then(res => {
              resolve(res)
            })
            .catch(error => {
              reject(error)
            })
        })
      },
    }
  },
}
