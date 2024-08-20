import express from "express";
import userControll from "../controllers/userControll.js";
import * as auth from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", auth.isAdminCheck, userControll.getAllUser);
router.get("/profile", auth.authenticatedUser, userControll.getUserById);
router.put("/", auth.authenticatedUser, userControll.updateUser);
router.delete("/:id",auth.isAdminCheck, userControll.deleteUser);

export default router;
