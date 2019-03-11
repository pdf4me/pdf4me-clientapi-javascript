module.exports = {
  createClient: apiClient => {
    const api = apiClient
    return {
      optimize: optimizeReq => {
        return new Promise((resolve, reject) => {
          api
            .postJson('/Optimize/Optimize', optimizeReq)
            .then(res => {
              resolve(res)
            })
            .catch(error => {
              reject(error)
            })
        })
      },
      optimizeByProfile: (profile, file, integrationConfig = {}) => {
        return new Promise((resolve, reject) => {
          api
            .postFormData('/Optimize/OptimizeByProfile', {
              profile,
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
