"use strict";

const sqlDbFactory = require("knex");


let sqlDb = sqlDbFactory({
    client: "pg",
    connection: process.env.DATABASE_URL || "postgres://localhost/qtb",
    ssl: false,
    debug: false,
    useNullAsDefault: true
});


const tables = {
    person: 'person',
    event: 'event',
    service: 'service',
    news: 'news',
    serviceParticipation: 'service_participation',
    servicePicture: 'service_picture'
};


function personTableSetup(database) {
    return database.schema.hasTable("person").then(exists => {
        if (!exists) {
            console.log("'person' table doesn't exist. Creation in progress");
            let peopleJson = require('../other/database_init/people.json');
            return database.schema.createTable(tables.person, table => {
                table.increments("id").unique().notNullable();
                table.string("firstName").notNullable();
                table.string("lastName").notNullable();
                table.string("picture").notNullable();
                table.text("description").notNullable();
                table.date("joinDate").notNullable();
                table.string("email").unique();
                table.string("phoneNumber").unique();
                table.string("facebook").unique();
                table.string("instagram").unique();
                table.string("twitter").unique();
            }).then(() =>{ return database(tables.person).insert(peopleJson);})
        } else {
            console.log("'person' table already exists");
        }
    });
}


function eventTableSetup(database) {
    return database.schema.hasTable(tables.event).then(exists => {
        if (!exists) {
            console.log("'event' table doesn't exist. Creation in progress");
            let eventsJson = require('../other/database_init/events.json');
            return database.schema.createTable(tables.event, table => {
                table.increments("id").unique().notNullable();
                table.string("name").notNullable();
                table.dateTime("datetime").notNullable();
                table.string("place").notNullable();
                table.string("picture").notNullable();
                table.text("description").notNullable();
                table.integer("contact").references("person.id")
                    .onUpdate("CASCADE").onDelete("SET NULL");
            }).then(() =>{ return database(tables.event).insert(eventsJson); })
        } else {
            console.log("'event' table already exists");
        }
    })
}


function serviceTableSetup(database) {
    return database.schema.hasTable(tables.service).then(exists => {
        if (!exists) {
            console.log("'service' table doesn't exist. Creation in progress");
            let servicesJson = require('../other/database_init/services.json');
            return database.schema.createTable(tables.service, table => {
                table.increments("id").unique().notNullable();
                table.string("name").notNullable();
                table.text("infos").notNullable();
                table.text("description").notNullable();
                table.integer("presentedInEvent").references("event.id")
                    .onUpdate("CASCADE").onDelete("SET NULL");
            }).then(() => { return database(tables.service).insert(servicesJson); })
        } else {
            console.log("'service' table already exists");
        }
    })
}


function newsTableSetup(database) {
    return database.schema.hasTable(tables.news).then(exists => {
        if (!exists) {
            console.log("'news' table doesn't exist. Creation in progress");
            let newsJson = require('../other/database_init/news.json');
            return database.schema.createTable(tables.news, table => {
                table.increments("id").unique().notNullable();
                table.string("title").notNullable();
                table.text("body").notNullable();
                table.string("media").notNullable();
                table.integer("serviceId").references("service.id")
                    .onUpdate("CASCADE").onDelete("SET NULL");
                table.integer("eventId").references("event.id")
                    .onUpdate("CASCADE").onDelete("SET NULL");
                table.integer("personId").references("person.id")
                    .onUpdate("CASCADE").onDelete("SET NULL");
            }).then(() => { return database(tables.news).insert(newsJson); });
        } else {
            console.log("'news' table already exists");
        }
    })
}


function serviceParticipationTableSetup(database) {
    return database.schema.hasTable(tables.serviceParticipation).then(exists => {
        if (!exists) {
            console.log("'service_participation' table doesn't exist. Creation in progress");
            return database.schema.createTable(tables.serviceParticipation, table => {
                table.integer("serviceId").references("service.id")
                    .onUpdate("CASCADE").onDelete("CASCADE");
                table.integer("personId").references("person.id")
                    .onUpdate("CASCADE").onDelete("CASCADE");
                table.text("description");
                table.primary(["serviceId", "personId"]);
            });
        } else {
            console.log("'service_participation' table already exists");
        }
    })
}


function servicePictureTableSetup(database) {
    return database.schema.hasTable(tables.servicePicture).then(exists => {
        if (!exists) {
            console.log("'service_picture' table doesn't exist. Creation in progress");
            let servicesPicturesJson = require('../other/database_init/servicesPictures.json');
            return database.schema.createTable(tables.servicePicture, table => {
                table.increments("id").unique().notNullable();
                table.integer("serviceId").references("service.id")
                    .onUpdate("CASCADE").onDelete("CASCADE").notNullable();
                table.string("filename").notNullable();
            }).then(() => { return database(tables.servicePicture).insert(servicesPicturesJson); })
        } else {
            console.log("'service_picture' table already exists")
        }
    })
}

//create the schema of each table, if not present already
async function setupDatabase() {
    console.log("Setting up the database");
    await personTableSetup(sqlDb);
    await eventTableSetup(sqlDb);
    await serviceTableSetup(sqlDb);
    await newsTableSetup(sqlDb);
    await serviceParticipationTableSetup(sqlDb);
    await servicePictureTableSetup(sqlDb);
    console.log("..done")
}


module.exports = {database: sqlDb, setupDatabase, tables};
