import express from 'express';
import {deleteUser, dislike, getUser, like, subscribe, unsubscribe, update} from '../controllers/user.js';
 import { verifyToken } from '../verifyToken.js';

const router = express.Router();
//update user
router.put("/:id",verifyToken,update) //antes de enviarnos a nuestro controlador verificara nuetro token y si todo esta correcto lo asignara a req.user y dira next()..continuar con la petición o solicitud al controlador.

//delete user
router.delete("/delete/:id",verifyToken,deleteUser)

//get user
router.get("/find/:id",verifyToken,getUser)

//subscribe a user
router.put("/sub/:id",verifyToken,subscribe)//me suscribo a un usuario

//unsubscribe a user
router.put("/unsub/:id",verifyToken,unsubscribe)

//like a video
router.put("/like/:videoId",verifyToken,like)

//dislike a video
router.put("/dislike/:videoId",verifyToken,dislike)



 export default router;