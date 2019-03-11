module.exports = {
  createClient: apiClient => {
    const api = apiClient
    return {
      createImages: createImagesReq => {
        return new Promise((resolve, reject) => {
          api
            .postJson('/Image/CreateImages', createImagesReq)
            .then(res => {
              resolve(res)
            })
            .catch(error => {
              reject(error)
            })
        })
      },
      createThumbnail: (
        width,
        pageNr,
        imageFormat,
        file,
        integrationConfig = {}
      ) => {
        return new Promise((resolve, reject) => {
          api
            .postFormData('/Image/CreateThumbnail', {
              width,
              pageNr,
              imageFormat,
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
      createThumbnails: (
        width,
        pageNrs,
        imageFormat,
        file,
        integrationConfig = {}
      ) => {
        return new Promise((resolve, reject) => {
          api
            .postFormData('/Image/CreateThumbnails', {
              width,
              pageNrs,
              imageFormat,
              file,
              integrationConfig: JSON.stringify(integrationConfig),
            })
            .then(jsonResponse => {
              var images = []
              jsonResponse.forEach(bas64Image => {
                images.push(Buffer.from(bas64Image, 'base64'))
              })
              resolve(images)
            })
            .catch(error => {
              reject(error)
            })
        })
      },
    }
  },
}
