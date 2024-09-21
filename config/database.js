import { Sequelize } from "sequelize";
import pg from "pg"
import env from "dotenv"
env.config()
const sequelize = new Sequelize(process.env.DB_URL, {dialect: "postgres", dialectModule: pg})

export default sequelize;