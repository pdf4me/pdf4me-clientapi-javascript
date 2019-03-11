module.exports = {
  createClient: apiClient => {
    const api = apiClient
    return {
      pdfA: pdfAReq => {
        return new Promise((resolve, reject) => {
          api
            .postJson('/PdfA/PdfA', pdfAReq)
            .then(res => {
              resolve(res)
            })
            .catch(error => {
              reject(error)
            })
        })
      },
      createPdfA: (pdfCompliance, file, integrationConfig = {}) => {
        return new Promise((resolve, reject) => {
          api
            .postFormData('/PdfA/CreatePdfA', {
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
