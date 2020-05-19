'use strict';


/**
 * Retrieve all news
 *
 * returns List
 **/
exports.newsGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "service" : 6,
  "person" : 1,
  "id" : 0,
  "media" : "media",
  "title" : "title",
  "body" : "body",
  "event" : 5
}, {
  "service" : 6,
  "person" : 1,
  "id" : 0,
  "media" : "media",
  "title" : "title",
  "body" : "body",
  "event" : 5
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Retrieve a specific news
 *
 * id Integer 
 * returns News
 **/
exports.newsIdGET = function(id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "service" : 6,
  "person" : 1,
  "id" : 0,
  "media" : "media",
  "title" : "title",
  "body" : "body",
  "event" : 5
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

