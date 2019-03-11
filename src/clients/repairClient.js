module.exports = {
  createClient: apiClient => {
    const api = apiClient
    return {
      repair: repairReq => {
        return new Promise((resolve, reject) => {
          api
            .postJson('/PdfA/Repair', repairReq)
            .then(res => {
              resolve(res)
            })
            .catch(error => {
              reject(error)
            })
        })
      },
      repairDocument: (file, integrationConfig = {}) => {
        return new Promise((resolve, reject) => {
          api
            .postFormData('/PdfA/RepairDocument', {
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
