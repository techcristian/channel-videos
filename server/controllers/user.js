import { createError } from "../error.js";
import User from '../models/User.js';
import Video from "../models/Video.js";

export const update = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can update only your account!"));
  }
};
export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted.");
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can delete only your account!"));
  }
};
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
    
  } catch (err) {
    next(err)
  }

};
//susbcribirme a un canal usando la ruta de ((((/api/users/sub/:id))),primero lleno la variable subcribedUsers de la db y..(cada vez que seción con un usuario me aparecen en el array todos los usuarios a los que me suscribi)..despues incremento el numero de suscriptores del usuario que le pase por parametro en el :id..
export const subscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subcribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subcribers: 1 },
    });
    res.status(200).json("Suscripción exitosa!!!.")
  } catch (err) {
    next(err);
  }
};
export const unsubscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id,{
      $pull: {subcribedUsers: req.params.id},
    });
    await User.findByIdAndUpdate(req.params.id,{
      $inc:{subcribers: -1},
    });
    res.status(200).json("desubscripción exitosa!!!")
    
  } catch (err) {
    next(err)
  }
};
export const like = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId,{
      $addToSet:{likes:id},
      $pull:{dislikes:id}
    })
    res.status(200).json("me gusta este video!!!")
  } catch (err) {
    next(err);
  }
};

export const dislike = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
      await Video.findByIdAndUpdate(videoId,{
        $addToSet:{dislikes:id},
        $pull:{likes:id}
      })
      res.status(200).json("este video no me gusta!!!")
  } catch (err) {
    next(err);
  }
};
