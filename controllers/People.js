'use strict';

var utils = require('../utils/writer.js');
var People = require('../service/PeopleService');

module.exports.peopleGET = function peopleGET (req, res, next) {
  var limit = req.swagger.params['limit'].value;
  var offset = req.swagger.params['offset'].value;
  People.peopleGET(limit,offset)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.peopleIdEventGET = function peopleIdEventGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  People.peopleIdEventGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      res.writeHead(response.code);
      res.end();
    });
};

module.exports.peopleIdGET = function peopleIdGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  People.peopleIdGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      res.writeHead(response.code);
      res.end();
    });
};

module.exports.peopleIdServicesGET = function peopleIdServicesGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  People.peopleIdServicesGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      res.writeHead(response.code);
      res.end();
    });
};
