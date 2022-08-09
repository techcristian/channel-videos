import User from '../models/User.js';
import Video from '../models/Video.js';
import {createError} from '../error.js';




export const addVideo = async (req,res,next)=>{
 //creamos un nuevo modelo usando la autenticacion de usuario y lo asignamos a la propiedad del modelo de Video(userId) Ppara despues validar..
  const newVideo = new Video({userId: req.user.id, ...req.body});
  try {
    //guardamos el nuevo video en la base de datos..
    const savedVideo = await newVideo.save()
    res.status(200).json(savedVideo)
  } catch (err) {
    next(err)
  }
};
export const updateVideo = async (req,res,next)=>{
  try {
    //buscamos en la base de datos si existe el video..
    const video = await Video.findById(req.params.id)
    if(!video) return next(createError(404,"video no encontrado!!!"))
    //si concide la verificacion del video con la de la autenticacion del usuario significa que somos el propietario del video y podemos actualizar..
    if(req.user.id === video.userId){
      const updatedVideo = await Video.findByIdAndUpdate(req.params.id,{
        $set: req.body,
      },{
        new:true
      });
      res.status(200).json(updatedVideo)
    } else {
      return next(createError(403,"solo puedes actualizar tus videos!!!"))
    }
    } catch (err) {
    next(err)
  }
};
export const deleteVideo = async (req,res,next)=>{
  try {
    //buscamos en la base de datos si existe el video..
    const video = await Video.findById(req.params.id)
    if(!video) return next(createError(404,"video no encontrado!!!"))
    //si concide la verificacion del video con la de la autenticacion del usuario significa que somos el propietario del video y podemos eliminar..
    if(req.user.id === video.userId){
      await Video.findByIdAndDelete(req.params.id,
        
        );
      res.status(200).json('el video ha sido eliminado!!!')
    } else {
      return next(createError(403,"solo puedes eliminar tus videos!!!"))
    }
    } catch (err) {
    next(err)
  }
}
  
 export const getVideo = async (req,res,next)=>{
  try {
    const video = await Video.findById(req.params.id)
    res.status(200).json(video)
  } catch (err) {
    next(err)
  }
};

export const addView = async (req,res,next)=>{
  try {
    const video = await Video.findByIdAndUpdate(req.params.id,{
      $inc:{views:1}
    })
    res.status(200).json('las vistas han incrementado!!!')
  } catch (err) {
    next(err)
  }
};
export const random = async (req,res,next)=>{
  try {
    const videos = await Video.aggregate([{$sample: {size:40}}]);
    res.status(200).json(videos)
  } catch (err) {
    next(err)
  }
};
//tendensia de videos mas vistos
export const trend = async (req,res,next)=>{
  try {
    const videos = await Video.find().sort({views:-1})
    res.status(200).json(videos)
  } catch (err) {
    next(err)
  }
};
// canal de todos los videos que me he suscripto!!!
export const sub = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subcribedChannels = user.subcribedUsers;

    const list = await Promise.all(
      subcribedChannels.map(async (channelId) => {
        return await Video.find({ userId: channelId });
      })
      );
      
      res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));//metodo de ordenación sort() para que podamos ver los ultimos videos ((en primer lugar))de los usuarios o canales que me he suscripto.//metodo flat() para desanidar las matrixes y muestro los objetos dentro de una sola matriz o array.
  } catch (err) {
    next(err);
  }
};
//obtener video por etiquetas
export const getByTag = async (req,res,next)=>{
  const tags =req.query.tags.split(",")
  console.log(tags)
  try {
    const videos = await Video.find({tags:{$in: tags }}).limit(20);// $in ((metodo para buscar o mirar dentro de las matrices que tengo dentro de tags y verifica si hay algun elemento..en este caso estamos usando a tags que esta dividido con el metodo split..y nos va a devolver los videos que le pasemos con las etiquetas de la consulta req.query.tags))
    res.status(200).json(videos)
  } catch (err) {
    next(err)
  }
};
//obtener video por titulo
export const search = async (req,res,next)=>{
  const query = req.query.q
  try {
    const videos = await Video.find({title:{ $regex: query, $options: "i"}}).limit(40)
    res.status(200).json(videos)
  } catch (err) {
    next(err)
  }
};
