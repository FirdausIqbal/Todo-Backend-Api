import { Sequelize } from "sequelize";
import env from "dotenv"
env.config()
const sequelize = new Sequelize(process.env.DB_URL, {dialect: "postgres"})

export default sequelize;