const url = require('url');

/**
 * Verifies that a uri is a valid one by checking it across node js' native uri parser
 * @param uri
 * @return {boolean}
 */
function validateUri(uri) {
  if (!uri) return false;
  const parsed = url.parse(uri);
  return !!parsed.hostname;
}

exports.validateUri = validateUri;
