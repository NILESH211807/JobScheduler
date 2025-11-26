import mysql from "mysql2/promise";

// mysql database pool connection
export const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",   // must be empty string
  database: "job_scheduler",
});

// export const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0,
// });
