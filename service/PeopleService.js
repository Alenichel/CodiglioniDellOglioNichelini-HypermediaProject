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
  return database("person").then(data => {
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
  return new Promise(async (resolve, reject) => {
    let data = await database(tables.event).select('id', 'name').limit(1).where('contact', id);
    if (data.length > 0) {
      resolve(data[0]);
    } else {
      reject({code: 404});
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
  return new Promise(async (resolve, reject) => {
    let data = await database(tables.person).where("id", id);
    if (data.length > 0) {
      resolve(data[0]);
    } else {
      reject({code: 404});
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
  return new Promise(async (resolve, reject) => {
    let participations = await database(tables.serviceParticipation).where("personId", id);
    if (participations.length > 0) {
      let services = [];
      for (let sp of participations) {
        let ss = await database(tables.service).where('id', sp.serviceId).limit(1);
        if (ss.length > 0) {
          let s = ss[0];
          s.serviceDetail = sp.description;
          services.push(s);
        }
      }
      resolve(services);
    } else {
      reject({code: 404});
    }
  });
}

