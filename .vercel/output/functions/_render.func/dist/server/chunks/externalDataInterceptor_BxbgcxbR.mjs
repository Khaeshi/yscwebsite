import { t as tokenIntercept } from "./getSSOTokenFromFile_D0WoEGs3.mjs";
import { g as fileIntercept } from "./S3Client_BSd7K461.mjs";
const externalDataInterceptor = {
  getFileRecord() {
    return fileIntercept;
  },
  interceptFile(path, contents) {
    fileIntercept[path] = Promise.resolve(contents);
  },
  getTokenRecord() {
    return tokenIntercept;
  },
  interceptToken(id, contents) {
    tokenIntercept[id] = contents;
  }
};
export {
  externalDataInterceptor as e
};
