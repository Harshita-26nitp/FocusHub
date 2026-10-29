import {Router} from "express";
import roomRoutes from "./room.routes.js"
import authRoutes from "./auth.routes.js"
import messageRoutes from"./message.routes.js";
import taskRoutes from "./task.routes.js";
import focusSessionRoutes from "./focusSession.routes.js";
const router=Router();
router.get("/health",(req,res)=>{
 res.json({
    success:true,
    message:"FocusHub API is healthy"
 });
});
router.use("/auth",authRoutes);
router.use("/rooms",roomRoutes);
router.use("/",messageRoutes);
router.use("/",taskRoutes);
router.use("/", focusSessionRoutes);
export default router;
