const sqlDbFactory = require("knex");

let sqlDb = sqlDbFactory({
    client: "pg",
    connection: process.env.DATABASE_URL || "postgres://localhost/qtb",
    ssl: false,
    debug: true
});

peopleSetup = (database) => {
    console.log("Checking if account table exists");
    return database.schema.hasTable("person").then(exists => {
        if (!exists) {
            console.log("It doesn't, so we create it");
            return database.schema.createTable("person", table => {
                table.increments("id").unique();
                table.string("first_name").notNullable();
                table.string("last_name").notNullable();
                table.string("description");
                table.date("join_date");
                table.string("email").unique();
                table.string("phone_number").unique();
                table.string("facebook").unique();
                table.string("instagram").unique();
                table.string("twitter").unique();
            })
        } else {
            console.log("Actually it exist, remove it before applying changes")
        }
    });
};

//create the schema of each table, if not present already
console.log("Setting up the database");
peopleSetup(sqlDb);