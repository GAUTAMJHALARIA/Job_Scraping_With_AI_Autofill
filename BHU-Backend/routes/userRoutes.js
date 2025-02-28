import express from "express";
import { login, signup, getUsers, logout, updateProfile } from "../controllers/userControl.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/getAllUsers/:id", getUsers);
router.get("/logout", logout);
router.put("/updateProfile/:id",  upload.fields([{ name: "profilePhoto" }, { name: "resume" }]) ,updateProfile);


export default router;
