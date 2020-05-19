'use strict';

var utils = require('../utils/writer.js');
var Services = require('../service/ServicesService');

module.exports.servicesGET = function servicesGET (req, res, next) {
  var limit = req.swagger.params['limit'].value;
  var offset = req.swagger.params['offset'].value;
  Services.servicesGET(limit,offset)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.servicesIdGET = function servicesIdGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  Services.servicesIdGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.servicesIdPeopleGET = function servicesIdPeopleGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  Services.servicesIdPeopleGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
