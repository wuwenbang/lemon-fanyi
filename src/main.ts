import md5 from "md5";
import axios from "axios";
import * as querystring from "querystring";
import { appid, key } from "./private";
interface Response {
  error_code?: string;
  error_msg?: string;
  from: string;
  to: string;
  trans_result: { src: string; dst: string }[];
}

export const translate = async (word: string) => {
  let from: string, to: string;
  if (/[a-zA-z]/.test(word[0])) {
    from = "en";
    to = "zh";
  } else {
    from = "zh";
    to = "en";
  }
  const query = word;
  const salt = new Date().getTime();
  const str1 = appid + query + salt + key;
  const sign = md5(str1);
  const queryString = querystring.stringify({
    q: query,
    appid: appid,
    salt: salt,
    from,
    to,
    sign: sign,
  });
  const res = await axios.get<Response>(
    `https://fanyi-api.baidu.com/api/trans/vip/translate?${queryString}`
  );
  const result = res.data;
  return new Promise((resolve, reject) => {
    if (result.error_code) {
      reject(result.error_msg);
    } else {
      resolve(result.trans_result[0].dst);
    }
  });
};
