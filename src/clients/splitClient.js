module.exports = {
  createClient: apiClient => {
    const api = apiClient
    return {
      split: splitReq => {
        return new Promise((resolve, reject) => {
          api
            .postJson('/Split/Split', splitReq)
            .then(res => {
              resolve(res)
            })
            .catch(error => {
              reject(error)
            })
        })
      },
      splitByPageNr: (pageNr, file, integrationConfig = {}) => {
        return new Promise((resolve, reject) => {
          api
            .postFormData('/Split/SplitByPageNr', {
              pageNr,
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
      splitRecurring: (pageNr, file, integrationConfig = {}) => {
        return new Promise((resolve, reject) => {
          api
            .postFormData('/Split/SplitRecurring', {
              pageNr,
              file,
              integrationConfig: JSON.stringify(integrationConfig),
            })
            .then(jsonResponse => {
              var documents = []
              jsonResponse.forEach(bas64Document => {
                documents.push(Buffer.from(bas64Document, 'base64'))
              })
              resolve(documents)
            })
            .catch(error => {
              reject(error)
            })
        })
      },
    }
  },
}
