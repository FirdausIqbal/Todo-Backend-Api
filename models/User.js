import { BOOLEAN, DataTypes } from "sequelize"
import db from "../config/database.js"

const User = db.define(
    "User",
    {
        username: {
            type: DataTypes.STRING(15),
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    },
    {
        tableName: "users", 
    }
)
export default User;