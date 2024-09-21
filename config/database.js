import { Sequelize } from "sequelize";
// import config from "./config.js";
const sequelize = new Sequelize(process.env.DB_URL)

export default sequelize;