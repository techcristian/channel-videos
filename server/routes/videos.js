import express from 'express';
import { addVideo, addView, deleteVideo, getByTag, getVideo, random, search, sub, trend, updateVideo } from '../controllers/video.js';
import { verifyToken } from '../verifyToken.js';
 const router = express.Router();
 
 
 //create a video
 router.post("/",verifyToken,addVideo)
 router.put("/:id",verifyToken,updateVideo)
 router.delete("/:id",verifyToken,deleteVideo)
 router.get("/find/:id",getVideo)
 router.put("/view/:id",addView) //cada vez que actualizamos aqui incrementamos las vistas al video.
 router.get("/trend",trend) //video de tendencia.
 router.get("/random",random) //videos aleatorios en el inicio de la pagina.
 router.get("/sub",verifyToken,sub) // videos de canales a los que me he suscripto.
 router.get("/tags",getByTag)//etiquetas
 router.get("/search",search)//buscar video por titulo
 
 export default router;