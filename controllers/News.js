'use strict';

var utils = require('../utils/writer.js');
var News = require('../service/NewsService');

module.exports.newsGET = function newsGET (req, res, next) {
  var limit = req.swagger.params['limit'].value;
  var offset = req.swagger.params['offset'].value;
  News.newsGET(limit,offset)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      res.writeHead(response.code);
      res.end();
    });
};

module.exports.newsIdGET = function newsIdGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  News.newsIdGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      res.writeHead(response.code);
      res.end();
    });
};
