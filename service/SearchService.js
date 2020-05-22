'use strict';


/**
 * Perform a search in the entire site
 *
 * query String 
 * returns List
 **/
exports.searchGET = function(query) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "name" : "name",
  "media" : "media",
  "type" : "type"
}, {
  "name" : "name",
  "media" : "media",
  "type" : "type"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

