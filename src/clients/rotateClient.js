module.exports = {
  createClient: apiClient => {
    const api = apiClient
    return {
      rotate: rotateReq => {
        return new Promise((resolve, reject) => {
          api
            .postJson('/PdfA/Rotate', rotateReq)
            .then(res => {
              resolve(res)
            })
            .catch(error => {
              reject(error)
            })
        })
      },
      rotateDocument: (rotate, file, integrationConfig = {}) => {
        return new Promise((resolve, reject) => {
          api
            .postFormData('/PdfA/RotateDocument', {
              rotate,
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
      rotatePage: (pageNr, rotate, file, integrationConfig = {}) => {
        return new Promise((resolve, reject) => {
          api
            .postFormData('/PdfA/RotatePage', {
              pageNr,
              rotate,
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
