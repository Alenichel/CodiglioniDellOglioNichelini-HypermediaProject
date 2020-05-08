'use strict';

const databaseService = require('./database');
let database = databaseService.database
let tables = databaseService.tables


/**
 * Retrieve all services
 *
 * limit Integer  (optional)
 * offset Integer  (optional)
 * returns List
 **/
exports.servicesGET = function(limit,offset) {
  if (!limit) limit = 100;
  if (!offset) offset = 0;
  return new Promise(async (resolve, reject) => {
    let data = await database(tables.service).limit(limit).offset(offset);
    for (let s of data) {
      let pictures = await database.select('filename').from(tables.servicePicture).where('serviceId', s.id);
      s.pictures = pictures.map(p => { return p.filename });
    }
    resolve(data);
  });
}


/**
 * Retrieve the service's event.
 *
 * id Integer 
 * returns Event
 **/
exports.servicesIdEventGET = function(id) {
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

