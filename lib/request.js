const axios = require('axios');

/**
 *
 * @param options
 * @param options.url
 */
async function httpGet(options) {
  const { url } = options;
  try {
    return await axios.get(url);
  } catch (e) {
    console.log(e);
    return e
  }
}

exports.httpGet = httpGet;
