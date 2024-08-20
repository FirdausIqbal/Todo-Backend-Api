import { where } from "sequelize";
import Task from "../models/Tasks.js"

export default {
    post: async(req,res)=>{
        try {
            const {taskName, contentTask} = req.body;
            const userId = req.user.id;
            const newTask = await Task.create({userId, taskName, contentTask});
            res.status(200).json({newTask})
        } catch (error) {
            console.log(error);
            res.status(500).json({message: error.message})
        }
    },
    getTaskById: async(req,res)=>{
        try {
            const taskData = await Task.findOne({
                where: {
                    id: req.params.id,
                }
            });
            if(taskData.userId === parseInt(req.user.id)){
                res.status(200).json(taskData)
            } else {
                res.status(403).json({message: "You're Not Allowed"})
            }
            
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Error While fetch Task"});
        }
    },
    getAllTask: async(req,res)=>{
        try {
            const allUser = await Task.findAll();
            res.status(200).json({allUser})
        } catch (error) {
            console.log(error);
            res.status(500).json({message: error});
        }
    },
    getAllUserTask: async(req,res)=>{
        try {
            const taskData = await Task.findAll({
                where: {
                    userId: req.user.id
                }
            });
            res.status(200).json(taskData)

        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Error While Fetch All Task"});
        }
    },
    updateTask: async(req,res)=>{
        try {
            const {taskName, contentTask} = req.body;
            const id = req.params.id;
            const task = await Task.findOne({where: {id, userId: req.user.id}})
            if(!task){
                res.status(401).json({message: "Task Not Found"})
            } else {
                if(task.userId === parseInt(req.user.id)){
                    task.taskName = taskName;
                    task.contentTask = contentTask;
                    task.save();
                    res.status(200).json({message: "Succes Updating Task", task})
                } else {
                    res.status(403).json({message: "You're Not Allowed"})
                }
            }
            
        } catch (error) {
            console.log(object);
            res.status(500).json({message: "Errow Updating Task"});
        }
    },
    deleteTask: async(req,res)=>{
        try {
            const task = await Task.destroy(
                {
                    where: {
                        id : req.params.id,
                        userId: req.user.id
                    }
                }
            );
            if(!task){
                res.status(200).json("Task Tidak ditemukan");
            } else {
                res.status(200).json({message: "Berhasil menghapus task"});
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Error While Deleting Task"});
        }
    }
}
