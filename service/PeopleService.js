'use strict';

const databaseService = require('./database');
let database = databaseService.database
let tables = databaseService.tables


/**
 * Retrieve all people.
 *
 * limit Integer  (optional)
 * offset Integer  (optional)
 * returns List
 **/
exports.peopleGET = function(limit,offset) {
  if (!limit) limit = 100;
  if (!offset) offset = 0;
  return database("person").limit(limit).offset(offset).then(data => {
    return data;
  });
}


/**
 * Retrieve the person's event.
 *
 * id Integer 
 * returns Event
 **/
exports.peopleIdEventGET = function(id) {
  return database(tables.event).select('id', 'name').limit(1).where('contact', id).then( data => {
    if (data.length > 0) {
      return data[0];
    }
    return {};
  })
}


/**
 * Retrieve a specific person
 *
 * id Integer 
 * returns Person
 **/
exports.peopleIdGET = function(id) {
  return database(tables.person).where("id", id).then( data => {
    return data[0];
  })

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

