module.exports = {
  createClient: apiClient => {
    const api = apiClient
    return {
      convertToPdf: convertToPdfReq => {
        return new Promise((resolve, reject) => {
          api
            .postJson('/Convert/ConvertToPdf', convertToPdfReq)
            .then(res => {
              resolve(res)
            })
            .catch(error => {
              reject(error)
            })
        })
      },
      convertFileToPdf: (file, integrationConfig = {}) => {
        return new Promise((resolve, reject) => {
          const fName =
            file.data instanceof Buffer
              ? file.fileName
              : file.path.split(/[\/,\\]/).pop()
          api
            .postFormData('/Convert/ConvertFileToPdf', {
              fName,
              file,
              integrationConfig: JSON.stringify(integrationConfig),
            })
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
