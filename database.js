import mysql from "mysql2";
import "dotenv/config";
import fs from "fs";

// using the variables from the .env file
// and creates the connection to database
const dbconfig = mysql.createConnection({
  host: process.env.HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DATABASE,
  password: process.env.MYSQL_PASSWORD,
  multipleStatements: true,
});

// Add certificate if present
if (process.env.MYSQL_CERT) {
  dbconfig.ssl = { cs: fs.readFileSync("DigiCertGlobalRootCA.crt.pem") };
}

export default dbconfig;
