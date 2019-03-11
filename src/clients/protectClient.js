module.exports = {
  createClient: apiClient => {
    const api = apiClient
    return {
      protect: protectReq => {
        return new Promise((resolve, reject) => {
          api
            .postJson('/PdfA/Protect', protectReq)
            .then(res => {
              resolve(res)
            })
            .catch(error => {
              reject(error)
            })
        })
      },
      protectDocument: (
        password,
        permissions,
        file,
        integrationConfig = {}
      ) => {
        return new Promise((resolve, reject) => {
          api
            .postFormData('/PdfA/ProtectDocument', {
              password,
              permissions,
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
      unlockDocument: (password, file, integrationConfig = {}) => {
        return new Promise((resolve, reject) => {
          api
            .postFormData('/PdfA/UnlockDocument', {
              password,
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
