const { Client } = require("pg");

const client = new Client(process.env.DB_URL); //Configuring PostgresSQL Database

module.exports = client;