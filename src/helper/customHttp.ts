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
    this.apiUrl = "https://api-dev.pdf4me.com"; //"https://api.pdf4me.com";
    this.userAgent = "pdf4me-js/0.8.5";
  }

  /**
   * HTTP Post sending the provided parameters.
   * @param controller controller
   * @param content parameters to be sent to the server
   */
  httpCustomWrapperPost(controller: string, content: object): Promise<Buffer> {
    let now = this;

    return now
      .postWrapper(this.apitoken, controller, content)
      .then(function(body: Buffer) {
        return body;
      })
      .catch(function(err) {
        console.log(err);
        throw new Pdf4meBackendException(500, err.toString(), "");
      });
  }

  /**
   * HTTP Post sending the provided object.
   * @param controller controller
   * @param object to be sent to the server
   */
  httpCustomUniversalFunctionPost(
    controller: string,
    object: Object
  ): Promise<JSON> {
    let now = this;
    return now
      .postUniversalFunction(this.apitoken, controller, object)
      .then(function(body) {
        let json = JSON.parse(body);
        return json;
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  /**
   * Builds a post requests from the given parameters.
   * @param token used to authorize the API access
   * @param controller controller
   * @param content parameters to be sent to the server
   */
  private postWrapper(
    token: string,
    controller: string,
    content: object
  ): Promise<Buffer> {
    let now = this;

    let options = {
      url: this.apiUrl + controller,
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: "Basic " + token,
        "User-Agent": this.userAgent
      },
      formData: content,
      encoding: null
    };

    return new Promise(function(resolve, reject) {
      // Do async job
      request.post(options, (err, resp, body) => {
        // check for error
        if (err != undefined) {
          throw new Pdf4meBackendException(500, err.toString(), "");
        }
        // check status code
        now.check_status_code(resp);
        // check response for error messages
        now.responseChecker.checkResponseForErrors(body);
        // continue request evaluation
        resolve(body);
      });
    });
  }

  /**
     * Sends a post request to the specified controller with the given
        universalObject as a body.
     * @param token used to authorize the API access
     * @param controller controller
     * @param object to be sent
     */
  private postUniversalFunction(
    token: string,
    controller: string,
    object: Object
  ): Promise<string> {
    let now = this;
    let json = JSON.stringify(object);

    let options = {
      method: "POST",
      uri: this.apiUrl + controller,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Basic " + token,
        "User-Agent": this.userAgent
      },
      body: json
    };

    return new Promise(function(resolve, reject) {
      // Do async job
      request(options, function(err, resp, body) {
        // check for error
        if (err) {
          throw new Pdf4meBackendException(500, err.toString(), "");
        }

        // check status code
        now.check_status_code(resp);

        // check response for error messages
        now.responseChecker.checkResponseForErrors(body);

        // continue request evaluation
        resolve(body);
      });
    });
  }

  /**
   * Checks whether the status code is either 200 or 204, otw. throws a Pdf4meBackendException.
   * @param statusCode HTTP response status code
   * @param message HTTP response message
   */
  private check_status_code(res: request.Response) {
    if (res.statusCode !== 200 && res.statusCode !== 204) {
      const errorResponse = JSON.parse(res.body);

      throw new Pdf4meBackendException(
        res.statusCode,
        errorResponse.errorMessage,
        errorResponse.traceId
      );
    }
  }
}
