'use strict';

const databaseService = require('./database');
let database = databaseService.database
let tables = databaseService.tables


/**
 * Retrieve all news
 *
 * limit Integer  (optional)
 * offset Integer  (optional)
 * returns List
 **/
exports.newsGET = function(limit, offset) {
  return database(tables.news).then(data => {
    return data;
  })
}


/**
 * Retrieve a specific news
 *
 * id Integer 
 * returns News
 **/
exports.newsIdGET = function(id) {
  return database(tables.news).where('id', id).then(data => {
    return data[0];
  });
}

