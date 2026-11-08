import {Router} from "express";
import {registerUser,loginUser,getCurrentUser,logoutUser} from "../controllers/auth.controllers.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router=Router();
router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/logout",logoutUser);
router.get("/me",authMiddleware,getCurrentUser);
export default router;
