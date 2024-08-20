import dotenv from "dotenv"
dotenv.config();
export default {
  "database": process.env.DB_NAME,
  "username": process.env.DB_USERNAME,
  "password": process.env.DB_PW,
  "host": process.env.DB_HOST,
  "dialect": process.env.DB_NAME,
  "logging": false
}
