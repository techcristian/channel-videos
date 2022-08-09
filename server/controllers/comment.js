import Comment from '../models/comment.js'
import {createError} from '../error.js';
import Video from '../models/Video.js';


//agregar un comentario:
export const addComment = async (req,res,next) =>{
  const newComment = new Comment({...req.body, userId:req.user.id}) //cereamos un nuevo modelo,usamos la identificacion de usuario y la guardamos en el userId del modelo.
 try {
    const savedComment = await newComment.save()//guardamos en db el nuevo comentario.
    res.status(200).send(savedComment)
  } catch (err) {
    next(err)
  }
};

//borrar un comentario:
export const deleteCommment = async (req,res,next)=> {
  try {
    const comment = await Comment.findById(req.params.id)//primero identificamos a nuestro usuario con del :id
    const video = await Video.findById(req.params.id)//tambien buscamos nuestro video a comentar
    if(req.user.id === comment.userId || req.user.id === video.userId){
    await Comment.findByIdAndDelete(req.params.id)
    res.status(200).json("el comentario fue eliminado")
    } else {
      return next(createError(403,'solo puedes eliminar tus comentarios unicamente!!!'))
    }
  } catch (err) {
    next(err)
  }
};

//obtener todos los comentarios
export const getComments = async (req,res,next)=> {
  try {
    const comments = await Comment.find({videoId:req.params.videoId})//obtengo todos los comentarios del req.params.videoId ,de la propiedad videoId de la db que al crear el new comment crea un nuevo modelo con la funcion que exportamos arriba addComment.
    res.status(200).json(comments)
  } catch (err) {
    next(err)
  }
};