'use strict';

const databaseService = require('./database');
let database = databaseService.database
let tables = databaseService.tables


/**
 * Retrieve all events.
 *
 * month String 
 * returns List
 **/
exports.eventsGET = function(month) {
  month = parseInt(month);
  return database(tables.event).then(data => {
    return data.filter(e => {
      return e.datetime.getMonth() === month;
    });
  })
}


/**
 * Retrieve a specific event.
 *
 * id Integer 
 * returns Event
 **/
exports.eventsIdGET = function(id) {
  return database(tables.event).where("id", id).then( data => {
    return data[0];
  })
}


/**
 * Retrieve the event's presented service.
 *
 * id Integer 
 * returns Service
 **/
exports.eventsIdServiceGET = function(id) {
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

