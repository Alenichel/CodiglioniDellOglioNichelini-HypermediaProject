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
  return new Promise(async (resolve, reject) => {
    month = parseInt(month);
    if (isNaN(month)) {
      reject({code: 400});
    } else {
      let data = await database(tables.event);
      data = data.filter(e => {
        return e.datetime.getMonth() === month;
      });
      resolve(data);
    }
  });
}


/**
 * Retrieve a specific event.
 *
 * id Integer 
 * returns Event
 **/
exports.eventsIdGET = function(id) {
  return new Promise(async (resolve, reject) => {
    let data = await database(tables.event).where("id", id).limit(1);
    if (data.length > 0) {
      resolve(data[0]);
    } else {
      reject({code: 404});
    }
  });
}


/**
 * Retrieve the event's presented service.
 *
 * id Integer 
 * returns Service
 **/
exports.eventsIdServiceGET = function(id) {
  return new Promise(async (resolve, reject) => {
    let data = await database(tables.service).where('presentedInEvent', id).limit(1);
    if (data.length > 0) {
      resolve(data[0]);
    } else {
      reject({code: 404})
    }
  });
}

