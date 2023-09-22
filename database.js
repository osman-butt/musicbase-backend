import mysql from "mysql2/promise";
import "dotenv/config";
import fs from "fs";

// using the variables from the .env file
// and creates the connection to database
const dbconfig = {
  host: process.env.MYSQL_HOST,
  // port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DATABASE,
  password: process.env.MYSQL_PASSWORD,
  multipleStatements: true,
};

// Add certificate if present
if (process.env.MYSQL_CERT) {
  dbconfig.ssl = { cs: fs.readFileSync("DigiCertGlobalRootCA.crt.pem") };
}

const connection = await mysql.createConnection(dbconfig);

export default connection;
