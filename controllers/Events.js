'use strict';

var utils = require('../utils/writer.js');
var Events = require('../service/EventsService');

module.exports.eventsGET = function eventsGET (req, res, next) {
  var month = req.swagger.params['month'].value;
  Events.eventsGET(month)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.eventsIdGET = function eventsIdGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  Events.eventsIdGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      res.writeHead(response.code);
      res.end();
    });
};

module.exports.eventsIdServiceGET = function eventsIdServiceGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  Events.eventsIdServiceGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      res.writeHead(response.code);
      res.end();
    });
};
