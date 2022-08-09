import express from 'express';
import {verifyToken} from "../verifyToken.js";
import { addComment, deleteCommment, getComments } from '../controllers/comment.js';
 const router = express.Router();

router.post("/",verifyToken,addComment)
router.delete("/:id",verifyToken,deleteCommment)
router.get("/:videoId",getComments)

 export default router;