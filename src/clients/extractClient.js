module.exports = {
  createClient: apiClient => {
    const api = apiClient
    return {
      extract: extractReq => {
        return new Promise((resolve, reject) => {
          api
            .postJson('/Extract/Extract', extractReq)
            .then(res => {
              resolve(res)
            })
            .catch(error => {
              reject(error)
            })
        })
      },
      extractResources: extractResourcesReq => {
        return new Promise((resolve, reject) => {
          api
            .postJson(
              '/Extract/ExtractResources',
              extractResourcesReq
            )
            .then(res => {
              resolve(res)
            })
            .catch(error => {
              reject(error)
            })
        })
      },
      extractPages: (pageNrs, file, integrationConfig = {}) => {
        return new Promise((resolve, reject) => {
          api
            .postFormData('/Extract/ExtractPages', {
              pageNrs,
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
      metadata: (file, integrationConfig = {}) => {
        return new Promise((resolve, reject) => {
          api
            .postFormData('/PdfA/Metadata', {
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
