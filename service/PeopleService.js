'use strict';


/**
 * Retrieve all people.
 *
 * limit Integer  (optional)
 * offset Integer  (optional)
 * returns List
 **/
exports.peopleGET = function(limit,offset) {
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


/**
 * Retrieve the person's event.
 *
 * id Integer 
 * returns Event
 **/
exports.peopleIdEventGET = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "datetime" : "datetime",
  "name" : "name",
  "description" : "description",
  "id" : 0,
  "place" : "place",
  "picture" : "picture"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Retrieve a specific person
 *
 * id Integer 
 * returns Person
 **/
exports.peopleIdGET = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
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
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Retrieve the person's services.
 *
 * id Integer 
 * returns List
 **/
exports.peopleIdServicesGET = function(id) {
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

