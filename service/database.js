const sqlDbFactory = require("knex");
const longStrings = require("./database_long_strings");


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


personTableSetup = database => {
    return database.schema.hasTable("person").then(exists => {
        if (!exists) {
            console.log("'person' table doesn't exist. Creation in progress");
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
            }).then(() => {
                return database(tables.person).insert({
                    firstName: "Alessandro",
                    lastName: "Nichelini",
                    picture: "/assets/img/alenichel.png",
                    description: "I'm a geek",
                    joinDate: "Today"
                });
            }).then(() => {
                return database(tables.person).insert({
                    firstName: "Fabio",
                    lastName: "Codiglioni",
                    picture: "/assets/img/fabiocody.jpeg",
                    description: "I'm a geek",
                    joinDate: "Today"
                });
            }).then(() => {
                return database(tables.person).insert({
                    firstName: "Anthony",
                    lastName: "Stark",
                    picture: "/assets/img/tony.jpg",
                    description: "The smartest avengers",
                    joinDate: "Today"
                });
            }).then(() => {
                return database(tables.person).insert({
                    firstName: "Natasha",
                    lastName: "Romanoff",
                    picture: "/assets/img/natasha.jpg",
                    description: "The most beautiful avengers",
                    joinDate: "Today"
                });
            }).then(() => {
                return database(tables.person).insert({
                    firstName: "Bruce",
                    lastName: "Banner",
                    picture: "/assets/img/banner.png",
                    description: "The strongest Avenger",
                    joinDate: "Today"
                });
            }).then(() => {
                return database(tables.person).insert({
                    firstName: "Steve",
                    lastName: "Rogers",
                    picture: "/assets/img/rogers.png",
                    description: "The captain",
                    joinDate: "Today"
                });
            }).then(() => {
                return database(tables.person).insert({
                    firstName: "Jane",
                    lastName: "Foster",
                    picture: "/assets/img/foster.png",
                    description: "The scientist",
                    joinDate: "Today"
                });
            }).then(() => {
                return database(tables.person).insert({
                    firstName: "Carol",
                    lastName: "Danvers",
                    picture: "/assets/img/danvers.png",
                    description: "From another universe",
                    joinDate: "Today"
                });
            }).then(() => {
                return database(tables.person).insert({
                    firstName: "Margaret",
                    lastName: "Carter",
                    picture: "/assets/img/carter.png",
                    description: "Secretary",
                    joinDate: "Today"
                });
            }).then(() => {
                return database(tables.person).insert({
                    firstName: "Pepper",
                    lastName: "Pots",
                    picture: "/assets/img/pots.png",
                    description: "Top manager",
                    joinDate: "Today"
                });
            })
        } else {
            console.log("'person' table already exists");
        }
    });
};


eventTableSetup = database => {
    return database.schema.hasTable(tables.event).then(exists => {
        if (!exists) {
            console.log("'event' table doesn't exist. Creation in progress");
            return database.schema.createTable(tables.event, table => {
                table.increments("id").unique().notNullable();
                table.string("name").notNullable();
                table.dateTime("datetime").notNullable();
                table.string("place").notNullable();
                table.string("picture").notNullable();
                table.text("description").notNullable();
                table.integer("contact").references("person.id")
                    .onUpdate("CASCADE").onDelete("SET NULL");
            }).then(() => {
                return database(tables.event).insert({
                    name: "Tech together",
                    datetime: new Date(2019, 12-1, 7, 16, 0),
                    place: "Headquarters",
                    picture: "/assets/img/elderly-computer.jpg",
                    description: "Presentation of the Tech Support service.",
                    contact: 1
                });
            }).then(() => {
                return database(tables.event).insert({
                    name: "Christmas party",
                    datetime: new Date(2019, 12-1, 25, 19, 30),
                    place: "Fancy disco",
                    picture: "/assets/img/christmas-party.jpg",
                    description: "Come celebrate Christmas with us!",
                    contact: 1
                });
            }).then(() => {
                return database(tables.event).insert({
                    name: "Talking together",
                    datetime: new Date(2020, 1-1, 14, 11, 0),
                    place: "Headquarters",
                    picture: "/assets/img/talking-together.jpg",
                    description: "We are proud to announce the launch of our new service, that will help ..."
                });
            }).then(() => {
                return database(tables.event).insert({
                    name: "Caring together",
                    datetime: new Date(2020, 1-1, 23, 17, 0),
                    place: "Headquarters",
                    picture: "/assets/img/laughing-grandma.jpg",
                    description: "Presentation of the Carers Training service."
                })
            })
        } else {
            console.log("'event' table already exists");
        }
    })
}


serviceTableSetup = database => {
    return database.schema.hasTable(tables.service).then(exists => {
        if (!exists) {
            console.log("'service' table doesn't exist. Creation in progress");
            return database.schema.createTable(tables.service, table => {
                table.increments("id").unique().notNullable();
                table.string("name").notNullable();
                table.text("infos").notNullable();
                table.text("description").notNullable();
                table.integer("presentedInEvent").references("event.id")
                    .onUpdate("CASCADE").onDelete("SET NULL");
            }).then(() => {
                return database(tables.service).insert({
                    name: "Private tutoring",
                    infos: "To decide when and where to meet, contact a tutor.",
                    description: "QualityTimeBank groups volunteers who have been offering tutoring to young people for multiple years."
                });
            }).then(() => {
                return database(tables.service).insert({
                    name: "English lessons",
                    infos: "",
                    description: "The goal of the project is to offer informal functional English teaching to marginalized citizens."
                });
            }).then(() => {
                return database(tables.service).insert({
                    name: "Carers training",
                    infos: "",
                    description: "There are more than six millions carers across the UK - and one in four Birmingham homes is in need of those carers."
                });
            }).then(() => {
                return database(tables.service).insert({
                    name: "Tech support",
                    infos: "",
                    description: "Our volunteers offer their knowledge to assist elderly people in using electronic devices."
                })
            })
        } else {
            console.log("'service' table already exists");
        }
    })
}


newsTableSetup = database => {
    return database.schema.hasTable(tables.news).then(exists => {
        if (!exists) {
            console.log("'news' table doesn't exist. Creation in progress");
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
            }).then(() => {
                return database(tables.news).insert({
                    title: "Government backs QTB to deliver language project",
                    body: longStrings.newsBody1,
                    media: "https://timebank.org.uk/wp-content/uploads/2019/10/housing-communities-local-government-logo-350x263-c-default.png",
                    serviceId: 2
                });
            }).then(() => {
                return database(tables.news).insert({
                    title: "Christmas volunteering – it's a party!",
                    body: longStrings.newsBody2,
                    media: "https://timebank.org.uk/wp-content/uploads/2019/12/TB-Christmas-volunteering-Acorns-2016_0-scaled-350x263-c-default.jpg",
                    eventId: 2
                });
            });
        } else {
            console.log("'news' table already exists");
        }
    })
}


serviceParticipationTableSetup = database => {
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


servicePictureTableSetup = database => {
    return database.schema.hasTable(tables.servicePicture).then(exists => {
        if (!exists) {
            console.log("'service_picture' table doesn't exist. Creation in progress");
            return database.schema.createTable(tables.servicePicture, table => {
                table.increments("id").unique().notNullable();
                table.integer("serviceId").references("service.id")
                    .onUpdate("CASCADE").onDelete("CASCADE").notNullable();
                table.string("filename").notNullable();
            }).then(() => {
                return database(tables.servicePicture).insert({
                    serviceId: 1,
                    filename: "/assets/img/tutoring.jpg"
                });
            }).then(() => {
                return database(tables.servicePicture).insert({
                    serviceId: 2,
                    filename: "/assets/img/talking-together.jpg"
                });
            }).then(() => {
                return database(tables.servicePicture).insert({
                    serviceId: 3,
                    filename: "/assets/img/laughing-grandma.jpg"
                });
            }).then(() => {
                return database(tables.servicePicture).insert({
                    serviceId: 4,
                    filename: "/assets/img/elderly-computer.jpg"
                })
            })
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
}


module.exports = {database: sqlDb, setupDatabase, tables};
