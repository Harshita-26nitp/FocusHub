import {Router} from "express";
import {startFocusSession,getRoomFocusSessions,cancelFocusSession,completeFocusSession} from "../controllers/focusSession.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router=Router();
router.post("/rooms/:roomId/focus-sessions",authMiddleware,startFocusSession);
router.get("/rooms/:roomId/focus-sessions",authMiddleware,getRoomFocusSessions);
router.put("/focus-sessions/:sessionId/complete",authMiddleware,completeFocusSession);
router.put("/focus-sessions/:sessionId/cancel",authMiddleware,cancelFocusSession);
export default router;