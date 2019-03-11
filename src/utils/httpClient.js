const fetch = require('node-fetch')
const FormData = require('form-data')
const { Pdf4meBackendError } = require('./customErrors')

module.exports = (pdf4meApiKey, config) => {
  const host = config.apiHost
  const agent = config.agent
  const commonHeaders = {
    Authorization: 'Basic ' + pdf4meApiKey,
    'User-Agent': config.userAgent,
  }

  return {
    postJson: (controller, object) => {
      return new Promise((resolve, reject) => {
        const options = {
          method: 'POST',
          headers: Object.assign({}, commonHeaders, {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          }),
          body: JSON.stringify(object),
        }

        if (agent) {
          options.agent = agent
        }

        fetch(host + controller, options)
          .then(res => {
            const resContentType = res.headers.get('content-type')
            const isJsonRes =
              resContentType &&
              resContentType.indexOf('application/json') > -1

            if (res.status !== 200 && res.status !== 204) {
              if (isJsonRes) {
                res
                  .json()
                  .then(error => {
                    reject(
                      new Pdf4meBackendError(
                        res.status,
                        errorResponse.errorMessage,
                        errorResponse.traceId
                      )
                    )
                  })
                  .catch(error => {
                    reject(
                      new Pdf4meBackendError(
                        res.status,
                        'unexpected server error: ' + res.status,
                        ''
                      )
                    )
                  })
              } else {
                reject(
                  new Pdf4meBackendError(
                    res.status,
                    'unexpected server error: ' + res.status,
                    ''
                  )
                )
              }
              return
            }

            if (res.status === 204) {
              resolve(null)
            } else if (isJsonRes) {
              res.json().then(data => {
                resolve(data)
              })
            } else {
              resolve(res.text())
            }
          })
          .catch(error => {
            new Pdf4meBackendError(500, 'unexpected server error', '')
          })
      })
    },

    postFormData: (controller, data) => {
      return new Promise((resolve, reject) => {
        const form = new FormData()

        Object.keys(data).forEach(key => {
          if (data[key].data instanceof Buffer) {
            form.append(key, data[key].data, {
              filename: data[key].fileName,
            })
          } else {
            form.append(key, data[key])
          }
        })

        const options = {
          method: 'POST',
          headers: Object.assign(
            {},
            commonHeaders,
            form.getHeaders()
          ),
          body: form,
        }

        if (agent) {
          options.agent = agent
        }

        fetch(host + controller, options)
          .then(res => {
            const resContentType = res.headers.get('content-type')
            const isJsonRes =
              resContentType &&
              resContentType.indexOf('application/json') > -1

            if (res.status !== 200 && res.status !== 204) {
              if (isJsonRes) {
                res
                  .json()
                  .then(error => {
                    reject(
                      new Pdf4meBackendError(
                        res.status,
                        errorResponse.errorMessage,
                        errorResponse.traceId
                      )
                    )
                  })
                  .catch(error => {
                    reject(
                      new Pdf4meBackendError(
                        res.status,
                        'unexpected server error: ' + res.status,
                        ''
                      )
                    )
                  })
              } else {
                reject(
                  new Pdf4meBackendError(
                    res.status,
                    'unexpected server error: ' + res.status,
                    ''
                  )
                )
              }
              return
            }

            if (res.status === 204) {
              resolve(null)
            } else if (isJsonRes) {
              res.json().then(data => {
                resolve(data)
              })
            } else if (
              resContentType === 'application/octet-stream'
            ) {
              res.buffer().then(data => {
                resolve(data)
              })
            } else {
              res.text().then(data => {
                resolve(data)
              })
            }
          })
          .catch(error => {
            new Pdf4meBackendError(500, 'unexpected server error', '')
          })
      })
    },
  }
}

/*
const options = {
  url: host + controller,
  headers: {
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
    Authorization: 'Basic ' + apiKey,
    'User-Agent': userAgent,
  },
  formData: {},
  encoding: null,
}

Object.keys(content).forEach(key => {
  if (content[key].data instanceof Buffer) {
    options.formData[key] = {
      value: content[key].data,
      options: {
        filename: content[key].fileName,
        contentType: content[key].contentType
          ? content[key].contentType
          : 'application/pdf',
      },
    }
  } else {
    options.formData[key] = content[key]
  }
})

request.post(options, (err, res, body) => {
  // check for error
  if (err != undefined) {
    reject(err)
    return
  }
  // check status code
  if (res.statusCode !== 200 && res.statusCode !== 204) {
    if (res.headers['content-type'] === 'application/json') {
      const errorResponse = JSON.parse(res.body)
      reject(
        new Pdf4meBackendError(
          res.statusCode,
          errorResponse.errorMessage,
          errorResponse.traceId
        )
      )
    } else {
      reject(
        new Pdf4meBackendError(
          res.statusCode,
          'unexpected error',
          ''
        )
      )
    }
    return
  }

  resolve(body)
})
})
*/
