'use strict';

const databaseService = require('./database');
let database = databaseService.database
let tables = databaseService.tables


/**
 * Retrieve all news
 *
 * returns List
 **/
exports.newsGET = function() {
  return database(tables.news).then(data => {
    return data;
  });
}


/**
 * Retrieve a specific news
 *
 * id Integer 
 * returns News
 **/
exports.newsIdGET = function(id) {
  return new Promise(async (resolve, reject) => {
    let data = await database(tables.news).where('id', id).limit(1);
    if (data.length > 0) {
      resolve(data[0]);
    } else {
      reject({code: 404});
    }
  })
}

