import taskControll from "../controllers/taskControll.js";
import { authenticatedUser, isAdminCheck } from "../middleware/authMiddleware.js";
import express from "express";
const router = express.Router();

router.post("/", authenticatedUser, taskControll.post);
router.get("/", isAdminCheck, taskControll.getAllTask);
router.get("/user/all",  authenticatedUser,taskControll.getAllUserTask);
router.get("/:id", authenticatedUser,taskControll.getTaskById);
router.put("/:id", authenticatedUser,taskControll.updateTask);
router.delete("/:id", authenticatedUser,taskControll.deleteTask);

export default router;