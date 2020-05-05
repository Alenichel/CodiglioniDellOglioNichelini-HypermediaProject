const sqlDbFactory = require("knex");

let sqlDb = sqlDbFactory({
    client: "pg",
    connection: process.env.DATABASE_URL || "postgres://localhost/qtb",
    ssl: false,
    debug: true
});

personTableSetup = (database) => {
    console.log("Checking if person table exists");
    return database.schema.hasTable("person").then(exists => {
        if (!exists) {
            console.log("It doesn't, so we create it");
            return database.schema.createTable("person", table => {
                table.increments("id").unique().notNullable();
                table.string("firstName").notNullable();
                table.string("lastName").notNullable();
                table.string("picture").notNullable();
                table.string("description").notNullable();
                table.date("joinDate").notNullable();
                table.string("email").unique();
                table.string("phoneNumber").unique();
                table.string("facebook").unique();
                table.string("instagram").unique();
                table.string("twitter").unique();
                //table.primary(["id"]);
            })
        } else {
            console.log("Actually it exists, remove it before applying changes");
        }
    });
};

eventTableSetup = (database) => {
    console.log("Checking if 'event' table exists");
    return database.schema.hasTable("event").then(exists => {
        if (!exists) {
            console.log("It doesn't exist, so we create it");
            return database.schema.createTable("event", table => {
                table.increments("id").unique().notNullable();
                table.string("name").notNullable();
                table.dateTime("datetime").notNullable();
                table.string("place").notNullable();
                table.string("picture").notNullable();
                table.string("description").notNullable();
                table.integer("contact").references("person.id")
                    .onUpdate("CASCADE").onDelete("SET NULL");
                //table.primary(["id"])
            })
        } else {
            console.log("Actually it exists, remove it before applying changes");
        }
    })
}

serviceTableSetup = (database) => {
    console.log("Checking if 'service' table exists");
    return database.schema.hasTable("service").then(exists => {
        if (!exists) {
            console.log("It doesn't exist, so we create it");
            return database.schema.createTable("service", table => {
                table.increments("id").unique().notNullable();
                table.string("name").notNullable();
                table.string("infos").notNullable();
                table.string("description").notNullable();
                table.integer("presentedInEvent").references("event.id")
                    .onUpdate("CASCADE").onDelete("SET NULL");
                //table.primary(["id"])
            })
        } else {
            console.log("Actually it exists, remove it before applying changes");
        }
    })
}

newsTableSetup = (database) => {
    console.log("Checking if 'news' table exists");
    return database.schema.hasTable("news").then(exists => {
        if (!exists) {
            console.log("It doesn't exist, so we create it");
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
                //table.primary(["id"])
            })
        } else {
            console.log("Actually it exists, remove it before applying changes");
        }
    })
}

serviceParticipationTableSetup = (database) => {
    console.log("Checking if 'serviceParticipation' table exists");
    return database.schema.hasClass("serviceParticipation").then(exists => {
        if (!exists) {
            console.log("It doesn't exist, so we create it");
            return database.schema.createTable("news", table => {
                table.integer("serviceId").references("service.id")
                    .onUpdate("CASCADE").onDelete("CASCADE");
                table.integer("personId").references("person.id")
                    .onUpdate("CASCADE").onDelete("CASCADE");
                table.string("description");
                table.primary(["serviceId", "personId"]);
            })
        } else {
            console.log("Actually it exists, remove it before applying changes");
        }
    })
}

//create the schema of each table, if not present already
function setupDatabase() {
    console.log("Setting up the database");
    personTableSetup(sqlDb);
    eventTableSetup(sqlDb);
    serviceTableSetup(sqlDb);
    newsTableSetup(sqlDb);
}