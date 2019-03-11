module.exports = {
  createClient: apiClient => {
    const api = apiClient
    return {
      stamp: stampReq => {
        return new Promise((resolve, reject) => {
          api
            .postJson('/Stamp/Stamp', stampReq)
            .then(res => {
              resolve(res)
            })
            .catch(error => {
              reject(error)
            })
        })
      },
      textStamp: (
        text,
        pages,
        alignX,
        alignY,
        file,
        integrationConfig = {}
      ) => {
        return new Promise((resolve, reject) => {
          api
            .postFormData('/Stamp/TextStamp', {
              text,
              pages,
              alignX,
              alignY,
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
