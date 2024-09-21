import dotenv from "dotenv"
import pg from "pg"
dotenv.config();
export default {
  "database": process.env.DB_NAME,
  "username": process.env.DB_USERNAME,
  "password": process.env.DB_PW,
  "host": process.env.DB_HOST,
  "dialect": "postgres",
  "dialectModule": pg,
  "logging": false
}
