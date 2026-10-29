import {Router} from "express";
import{ getRoomMessages} from "../controllers/message.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router=Router();
router.get("/rooms/:roomId/messages",authMiddleware,getRoomMessages);
export default router;