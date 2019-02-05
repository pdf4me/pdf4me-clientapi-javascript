import * as request from "request";
import ResponseChecker from "../helper/responseChecker";
import { Pdf4meBackendException } from "./pdf4meExceptions";

export default class CustomHttp {
  responseChecker: ResponseChecker;
  apitoken: string;
  apiUrl: string;
  userAgent: string;

  constructor(apitoken: string) {
    this.responseChecker = new ResponseChecker();
    this.apitoken = apitoken;
    this.apiUrl = "https://api-dev.pdf4me.com";
    this.userAgent = "pdf4me-js/0.9.5";
  }

  postJson<T>(controller: string, object: object): Promise<T> {
    return new Promise((resolve, reject) => {
      const json = JSON.stringify(object);

      let options = {
        url: this.apiUrl + controller,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Basic " + this.apitoken,
          "User-Agent": this.userAgent
        },
        body: json
      };

      request.post(options, (err, res, body) => {
        // check for error
        if (err != undefined) {
          reject(err);
          return;
        }
        // check status code
        if (res.statusCode !== 200 && res.statusCode !== 204) {
          const errorResponse = JSON.parse(res.body);
          reject(
            new Pdf4meBackendException(
              res.statusCode,
              errorResponse.errorMessage,
              errorResponse.traceId
            )
          );
          return;
        }

        if (typeof body === "string") {
          resolve(JSON.parse(body));
        } else {
          resolve(body);
        }
      });
    });
  }

  postFormData<T>(controller: string, content: object): Promise<T> {
    return new Promise((resolve, reject) => {
      let options = {
        url: this.apiUrl + controller,
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          Authorization: "Basic " + this.apitoken,
          "User-Agent": this.userAgent
        },
        formData: content,
        encoding: null
      };

      request.post(options, (err, res, body) => {
        // check for error
        if (err != undefined) {
          reject(err);
          return;
        }
        // check status code
        if (res.statusCode !== 200 && res.statusCode !== 204) {
          const errorResponse = JSON.parse(res.body);
          reject(
            new Pdf4meBackendException(
              res.statusCode,
              errorResponse.errorMessage,
              errorResponse.traceId
            )
          );
          return;
        }

        resolve(body);
      });
    });
  }
}
