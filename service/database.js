const sqlDbFactory = require("knex");


let sqlDb = sqlDbFactory({
    client: "pg",
    connection: process.env.DATABASE_URL || "postgres://localhost/qtb",
    ssl: false,
    debug: true,
    useNullAsDefault: true
});


personTableSetup = (database) => {
    return database.schema.hasTable("person").then(exists => {
        if (!exists) {
            console.log("'person' table doesn't exist. Creation in progress");
            return database.schema.createTable("person", table => {
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
                console.log("Creating ALESSANDRO NICHELINI");
                return database("person").insert({
                    firstName: "Alessandro",
                    lastName: "Nichelini",
                    picture: "/assets/img/laughing-grandma.jpg",
                    description: "I'm a geek",
                    joinDate: "Today"
                });
            });
        } else {
            console.log("'person' table already exists");
        }
    });
};


eventTableSetup = (database) => {
    return database.schema.hasTable("event").then(exists => {
        if (!exists) {
            console.log("'event' table doesn't exist. Creation in progress");
            return database.schema.createTable("event", table => {
                table.increments("id").unique().notNullable();
                table.string("name").notNullable();
                table.dateTime("datetime").notNullable();
                table.string("place").notNullable();
                table.string("picture").notNullable();
                table.text("description").notNullable();
                table.integer("contact").references("person.id")
                    .onUpdate("CASCADE").onDelete("SET NULL");
            });
        } else {
            console.log("'event' table already exists");
        }
    })
}


serviceTableSetup = (database) => {
    return database.schema.hasTable("service").then(exists => {
        if (!exists) {
            console.log("'service' table doesn't exist. Creation in progress");
            return database.schema.createTable("service", table => {
                table.increments("id").unique().notNullable();
                table.string("name").notNullable();
                table.string("infos").notNullable();
                table.text("description").notNullable();
                table.integer("presentedInEvent").references("event.id")
                    .onUpdate("CASCADE").onDelete("SET NULL");
            });
        } else {
            console.log("'service' table already exists");
        }
    })
}


newsTableSetup = (database) => {
    return database.schema.hasTable("news").then(exists => {
        if (!exists) {
            console.log("'news' table doesn't exist. Creation in progress");
            return database.schema.createTable("news", table => {
                table.increments("id").unique().notNullable();
                table.string("title").notNullable();
                table.string("body").notNullable();
                table.string("mediaURL").notNullable();
                table.integer("serviceId").references("service.id")
                    .onUpdate("CASCADE").onDelete("SET NULL");
                table.integer("eventId").references("event.id")
                    .onUpdate("CASCADE").onDelete("SET NULL");
                table.integer("personId").references("person.id")
                    .onUpdate("CASCADE").onDelete("SET NULL");
            });
        } else {
            console.log("'news' table already exists");
        }
    })
}


serviceParticipationTableSetup = (database) => {
    return database.schema.hasTable("serviceParticipation").then(exists => {
        if (!exists) {
            console.log("'serviceParticipation' table doesn't exist. Creation in progress");
            return database.schema.createTable("serviceParticipation", table => {
                table.integer("serviceId").references("service.id")
                    .onUpdate("CASCADE").onDelete("CASCADE");
                table.integer("personId").references("person.id")
                    .onUpdate("CASCADE").onDelete("CASCADE");
                table.text("description");
                table.primary(["serviceId", "personId"]);
            });
        } else {
            console.log("'serviceParticipation' table already exists");
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
}


module.exports = { database: sqlDb, setupDatabase };
