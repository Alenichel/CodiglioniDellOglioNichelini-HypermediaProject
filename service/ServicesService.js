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
      reject({code: 400});
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
      resolve(s);
    } catch(error) {
      reject({code: 404});
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
  return new Promise(async (resolve, reject) => {
    let participations = await database(tables.serviceParticipation).where("serviceId", id);
    if (participations.length > 0) {
      let people = [];
      for (let sp of participations) {
        let pp = await database(tables.person).where('id', sp.personId);
        if (pp.length > 0) {
          let p = pp[0];
          p.serviceDetail = sp.description;
          people.push(p);
        }
      }
      resolve(people);
    } else {
      reject({code: 404});
    }
  });
}

