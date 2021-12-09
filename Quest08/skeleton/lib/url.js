const url = require("url");
const queryString = require("querystring");
function urlUtil(requestUrl) {
  const myUrl = url.parse(requestUrl);

  const path = myUrl.pathname;
  const query = queryString.parse(myUrl.query);

  return {
    path,
    query,
  };
}

module.exports = urlUtil;
