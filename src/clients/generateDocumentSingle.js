module.exports = {
  createClient: apiClient => {
    const api = apiClient
    return {
      generateDocumentSingle: generateDocumentSingleReq => {
        return new Promise((resolve, reject) => {
          api
            .postJson('/Document/GenerateDocumentSingle', generateDocumentSingleReq)
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
