import { DataTypes } from "sequelize"
import db from "../config/database.js"
import User from "./User.js";

const Task = db.define(
    "Task",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        taskName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contentTask: {
            type: DataTypes.STRING,
            allowNull: false,

        }
    },
    {
        tableName: "tasks"
    }
)
User.hasMany(Task, {foreignKey: "userId"})
Task.belongsTo(User, {foreignKey: "userId"})

export default Task;