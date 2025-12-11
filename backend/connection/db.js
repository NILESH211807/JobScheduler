import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";


export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected");
  } catch (err) {
    console.error("DB Error:", err);
  }
}

// import mysql from "mysql2/promise";

// export const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
//     port: Number(process.env.DB_PORT || 3306),
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0,
//       connectTimeout: 15000,

// });

// pool.getConnection()
//     .then(() => console.log("DB Connected"))
//     .catch(err => console.error("DB Error:", err));




