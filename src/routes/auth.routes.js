import {Router} from "express";
import {registerUser} from "../controllers/auth.controllers.js";
import{loginUser,getCurrentUser} from"../controllers/auth.controllers.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router=Router();
router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/me",authMiddleware,getCurrentUser);
export default router;