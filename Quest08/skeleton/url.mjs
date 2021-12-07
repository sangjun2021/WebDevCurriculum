import url from "url";
import querystring from "querystring";
export function urlUtil(requestUrl) {
  const myUrl = url.parse(requestUrl);

  const path = myUrl.pathname;
  const query = querystring.parse(myUrl.query);

  return {
    path,
    query,
  };
}
