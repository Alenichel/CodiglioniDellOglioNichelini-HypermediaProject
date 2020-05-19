'use strict';

var utils = require('../utils/writer.js');
var News = require('../service/NewsService');

module.exports.newsGET = function newsGET (req, res, next) {
  News.newsGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.newsIdGET = function newsIdGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  News.newsIdGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
