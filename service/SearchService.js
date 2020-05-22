'use strict';

const databaseService = require('./database');
let database = databaseService.database
let tables = databaseService.tables


/**
 * Perform a search in the entire site
 *
 * query String 
 * returns List
 **/
exports.searchGET = function(query) {
  return new Promise(async (resolve, reject) => {
    let people = await database.select('id', 'firstName', 'lastName', 'picture').from(tables.person);
    people = people.map(p => {
      return {
        id: p.id,
        name: p.firstName + ' ' + p.lastName,
        media: p.picture,
        type: 'person'
      };
    });
    let events = await database.select('id', 'name', 'picture').from(tables.event);
    events = events.map(e => {
      return {
        id: e.id,
        name: e.name,
        media: e.picture,
        type: 'event'
      };
    });
    let services = await database.select('id', 'name').from(tables.service);
    for (let s of services) {
      let pictures = await database.select('filename').from(tables.servicePicture).where('serviceId', s.id).limit(1);
      s.picture = pictures[0].filename;
    }
    services = services.map(s => {
      return {
        id: s.id,
        name: s.name,
        media: s.picture,
        type: 'service'
      };
    });
    let news = await database.select('id', 'title', 'media').from(tables.news);
    news = news.map(n => {
      return {
        id: n.id,
        name: n.title,
        media: n.media,
        type: 'news'
      };
    })
    let data = people.concat(events).concat(services).concat(news);
    data = data.filter(x => {
      return x.name.toLowerCase().includes(query.toLowerCase());
    })
    resolve(data);
  });
}

