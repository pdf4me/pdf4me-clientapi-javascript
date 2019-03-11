module.exports = {
  createClient: apiClient => {
    const api = apiClient
    return {
      validate: validateReq => {
        return new Promise((resolve, reject) => {
          api
            .postJson('/PdfA/Validate', validateReq)
            .then(res => {
              resolve(res)
            })
            .catch(error => {
              reject(error)
            })
        })
      },
      validateDocument: (
        pdfCompliance,
        file,
        integrationConfig = {}
      ) => {
        return new Promise((resolve, reject) => {
          api
            .postFormData('/PdfA/ValidateDocument', {
              pdfCompliance,
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
