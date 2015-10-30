var express = require('express')
  , router = express.Router();

var Helpers = require('./helpers');

var Client = require('./client')
  , API = new Client();

/*!
 * Users directory (base)
 *
 * @param
 * @return
 */
router.get('/users', [Helpers.crossDomain], function(req, res, next) {

  req.query.user_details = 1;
  req.query.user_jobs = 1;
  req.query.user_avatar = 1;
  req.query.user_reputation = 1;

  API.get('/users/0.1/users/directory/?', req.query, function(err, response, request) {
    if (!err && response.status === 'success')
      return res.json(response);
    return res.json(false);
  });
});

/*!
 * User by ID (granular)
 *
 * @param
 * @return
 */
router.get('/users/*', [Helpers.crossDomain], function(req, res, next) {
  var id = parseInt(req.params[0]);
  var params = {
    'users[]': id
  };
  API.get('/users/0.1/users/?', params, function(err, response, request) {
    if (!err && response.status === 'success')
      return res.json(response);
    return res.json(false);
  });
});

/*!
 * Get all Skills
 *
 * @param
 * @return
 */
router.get('/skills', [Helpers.crossDomain], function(req, res, next) {

  API.get('/projects/0.1/jobs/', {}, function(err, response, request) {
    if (!err && response.status === 'success')
      return res.json(response);
    return res.json(false);
  });
});

/*!
 * Get all Skill categories
 *
 * @param
 * @return
 */
router.get('/skills/categories', [Helpers.crossDomain], function(req, res, next) {

  API.get('/projects/0.1/job_bundle_categories/', {}, function(err, response, request) {
    if (!err && response.status === 'success')
      return res.json(response);
    return res.json(false);
  });
});

/*!
 * Get Skills by category ID
 *
 * @param
 * @return
 */
router.get('/skills/*', [Helpers.crossDomain], function(req, res, next) {
  var id = parseInt(req.params[0]);

  API.get('/projects/0.1/jobs/', {}, function(err, response, request) {
    if (!err && response.status === 'success')
      
      response.result = response.result.filter(function(el) {
        return el.category.id === id;
      });
      return res.json(response);
    return res.json(false);
  });
});


exports.router = router;
