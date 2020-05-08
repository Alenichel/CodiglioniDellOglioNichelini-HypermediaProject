'use strict';

var utils = require('../utils/writer.js');
var ContactUs = require('../service/ContactUsService');

module.exports.contactPOST = function contactPOST (req, res, next) {
  var name = req.swagger.params['name'].value;
  var email = req.swagger.params['email'].value;
  var subject = req.swagger.params['subject'].value;
  var message = req.swagger.params['message'].value;
  ContactUs.contactPOST(name,email,subject,message)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
