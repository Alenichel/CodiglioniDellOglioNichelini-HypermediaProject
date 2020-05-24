'use strict';


/**
 * Retrieve all events.
 *
 * month Integer  (optional)
 * returns List
 **/
exports.eventsGET = function(month) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "datetime" : "datetime",
  "name" : "name",
  "description" : "description",
  "id" : 0,
  "place" : "place",
  "picture" : "picture"
}, {
  "datetime" : "datetime",
  "name" : "name",
  "description" : "description",
  "id" : 0,
  "place" : "place",
  "picture" : "picture"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
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
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "datetime" : "datetime",
  "name" : "name",
  "description" : "description",
  "id" : 0,
  "place" : "place",
  "picture" : "picture"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
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

