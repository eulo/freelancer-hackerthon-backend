var Helpers = {};

Helpers.crossDomain = function(req, res, next) {
  // Add headers
  // Website you wish to allow to connect
  if (req.headers.origin !== void 0)
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Content-MD5, X-Alt-Referer');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
};

module.exports = Helpers;
