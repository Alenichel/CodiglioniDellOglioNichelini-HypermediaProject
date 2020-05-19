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
exports.servicesGET = function(limit, offset) {
  if (!offset) offset = 0;
  return new Promise(async (resolve, reject) => {
    try {
      let data;
      if (limit) {
        data = await database(tables.service).limit(limit).offset(offset);
      } else {
        data = await database(tables.service).offset(offset);
      }
      for (let s of data) {
        let pictures = await database.select('filename').from(tables.servicePicture).where('serviceId', s.id);
        s.pictures = pictures.map(p => { return p.filename });
      }
      resolve(data);
    } catch(error) {
      reject(error);
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
  return new Promise(async (resolve, reject) => {
    try {
      let data = await database(tables.service).where('id', id);
      let s = data[0];
      let pictures = await database.select('filename').from(tables.servicePicture).where('serviceId', s.id);
      s.pictures = pictures.map(p => { return p.filename });
      console.log(s);
      resolve(s);
    } catch(error) {
      reject(error);
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
  return database.select('personId', 'description').from(tables.serviceParticipation).where('serviceId', id).then(data => {
    console.log(data);
    return data;
  });
}

