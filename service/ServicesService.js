'use strict';


/**
 * Retrieve all services
 *
 * limit Integer  (optional)
 * offset Integer  (optional)
 * returns List
 **/
exports.servicesGET = function(limit,offset) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "name" : "name",
  "serviceDetail" : "serviceDetail",
  "description" : "description",
  "id" : 0,
  "infos" : "infos",
  "pictures" : [ "pictures", "pictures" ]
}, {
  "name" : "name",
  "serviceDetail" : "serviceDetail",
  "description" : "description",
  "id" : 0,
  "infos" : "infos",
  "pictures" : [ "pictures", "pictures" ]
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Retrieve a specific service
 *
 * id Integer 
 * returns Service
 **/
exports.servicesIdGET = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "name" : "name",
  "serviceDetail" : "serviceDetail",
  "description" : "description",
  "id" : 0,
  "infos" : "infos",
  "pictures" : [ "pictures", "pictures" ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Retrieve the service's people.
 *
 * id Integer 
 * returns List
 **/
exports.servicesIdPeopleGET = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "firstName" : "firstName",
  "lastName" : "lastName",
  "twitter" : "twitter",
  "joinDate" : "joinDate",
  "phoneNumber" : "phoneNumber",
  "facebook" : "facebook",
  "serviceDetail" : "serviceDetail",
  "description" : "description",
  "id" : 0,
  "instagram" : "instagram",
  "picture" : "picture",
  "email" : "email"
}, {
  "firstName" : "firstName",
  "lastName" : "lastName",
  "twitter" : "twitter",
  "joinDate" : "joinDate",
  "phoneNumber" : "phoneNumber",
  "facebook" : "facebook",
  "serviceDetail" : "serviceDetail",
  "description" : "description",
  "id" : 0,
  "instagram" : "instagram",
  "picture" : "picture",
  "email" : "email"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

