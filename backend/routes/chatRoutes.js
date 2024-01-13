import exress from 'express';
import { handleAuth } from '../middlewares/authmiddleware.js';
import { addToGroup, chatAccess, createGroupChat, getChats, removeFromGroup, renameGroup } from '../controllers/chatController.js';

const router = exress.Router();


router.post("/", handleAuth, chatAccess);
router.get("/" , handleAuth , getChats);
router.post("/group" , handleAuth , createGroupChat);
router.put("rename" , handleAuth , renameGroup);
router.put("/addgroup" , handleAuth , addToGroup);
router.put("/remove" , handleAuth , removeFromGroup);
// router.get("/", handleAuth, getChat)

export default router;