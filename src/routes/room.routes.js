import {Router} from "express";
import {
    createRoom,
    getAllRooms,
    joinRoom,
    leaveRoom,
    getRoomDetails,
    updateRoom,
    deleteRoom,
    getMyRooms
} from "../controllers/room.controllers.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router=Router();
router.post("/",authMiddleware,createRoom);
router.get("/",getAllRooms);
router.get("/my-rooms",authMiddleware,getMyRooms);
router.post("/:roomId/join",authMiddleware,joinRoom);
router.post("/:roomId/leave",authMiddleware,leaveRoom);
router.get("/:roomId",authMiddleware,getRoomDetails);
router.put("/:roomId",authMiddleware,updateRoom);
router.delete("/:roomId",authMiddleware,deleteRoom);
export default router;