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
  return database(tables.event).where("id", id).limit(1).then( data => {
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
  return database(tables.service).where('presentedInEvent', id).limit(1).then(data => {
    return data[0];
  });
}

