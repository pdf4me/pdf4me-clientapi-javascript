import { Pdf4meClientException } from "../helper/Pdf4meExceptions";
import { DocLog, Document } from "../model/model";

export default class ResponseChecker {
  constructor() {}

  /*
    /**
     * Checks document logs for error reports, in case an error is found a Pdf4meClientException is thrown.
     * @param res contains resulting PDF
     */
  public checkResponseForErrors(res: string) {
    // check whether response is undefined
    if (res == undefined) {
      throw new Pdf4meClientException("Server Error");
    }

    // check whether the response contains one or multiple documents
    var oneDoc: Document;
    var multipleDocs: Array<Document>;
    var docs: Array<Document> = [];
    try {
      oneDoc = JSON.parse(res)["document"];
      multipleDocs = JSON.parse(res)["documents"] as Array<Document>;
    } catch {
      // response is not a json - therefore there are no docLogs which can be checked for error messages
      return;
    }

    if (oneDoc != undefined) {
      docs = [oneDoc];
    } else if (multipleDocs != undefined) {
      docs = multipleDocs;
    }

    // extract docs logs
    var docLogs: Array<DocLog> = [];
    var i;
    for (i = 0; i < docs.length; i++) {
      docLogs = docLogs.concat(docs[i].docLogs as Array<DocLog>);
    }

    // check all docLogs for errors
    for (i = 0; i < docLogs.length; i++) {
      let currentLog = docLogs[i];
      if (currentLog != undefined && Number(currentLog.docLogLevel) == 3) {
        throw new Pdf4meClientException(currentLog.message as string);
      }
    }
  }
}
