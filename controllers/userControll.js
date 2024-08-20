import User from "../models/User.js";

export default {
    getAllUser: async(req,res)=>{
        try {
            const dataUser = await User.findAll();
            const filteredData = dataUser.map((item)=> {
                const {password, ...data} = item.dataValues
                return data
            })
            res.status(201).json(filteredData);
        } catch (error) {
            console.log(error);
            res.status(200).json("Error Get User")
        }
    },
    getUserById: async(req,res)=>{
        try {
            const dataUser = await User.findOne(
                {
                    where: {
                        id: req.user.id
                    }
                });
            if (!dataUser){
                res.status(403).json("You're Not Allowed")
            } else{
                const {isAdmin, password, ...data} = dataUser.dataValues;
                res.status(201).json(data)
            }
        } catch (error) {
            console.log(error)
        }
    },
    updateUser: async(req,res)=>{
        try {
            const id = req.user.id;
            const {username, password, email} = req.body;
            await User.update(
                {username, password, email},
                {
                    where: {
                        id: id
                    }
                }
            )
            res.status(200).json("Succes Updating User")
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "error while updating user"});
        }
    },
    deleteUser: async(req,res)=>{
        try {
            const user = await User.destroy(
                {
                    where: {
                        id: req.params.id
                    }
                }
            )
            console.log(user)
            if(!user){
                res.status(200).json("User Tidak Ditemukan")
            } else {
                res.status(200).json(
                    {
                        message: "Berhasil menghapus User",
                    }
                )
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Error While Deleting User"});
        }
    }
}