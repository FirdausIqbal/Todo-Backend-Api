import sequelize from "../config/database.js";

const init = async ()=> {
    try{
        await sequelize.authenticate();
        console.log("Database authenticate success");
    
        await sequelize.sync();
        console.log("All models were synchronized successfully.")
    } catch(err){
        console.log(err)
    }
}


export {init};