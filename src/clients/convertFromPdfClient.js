module.exports = {
  createClient: (apiClient) => {
    const api = apiClient
    return {
      convertFromPdf: (convertFromPdfReq) => {
        return new Promise((resolve, reject) => {
          api
            .postJson(
              '/ConvertFromPdf/ConvertFromPdf',
              convertFromPdfReq
            )
            .then((res) => {
              resolve(res)
            })
            .catch((error) => {
              reject(error)
            })
        })
      },
      // convertFromPdfByType: (file, outputFormat, qualityType) => {
      //   return new Promise((resolve, reject) => {
      //     api
      //       .postFormData('/ConvertFromPdf/ConvertFromPdfByType', {
      //         file,
      //         outputFormat,
      //         qualityType,
      //       })
      //       .then((res) => {
      //         resolve(res)
      //       })
      //       .catch((error) => {
      //         reject(error)
      //       })
      //   })
      // },
    }
  },
}
