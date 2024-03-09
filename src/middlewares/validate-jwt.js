import jwt from 'jsonwebtoken'
import Usuario from '../modules/user/user.model.js'

export const validateJWT = async (req, res, next) => {
    const token = req.header("x-access-token");

  if (!token) {
    return res.status(401).json({
      msg: "You did not provide a token.",
    });
  }

  try {
    //verificación de token
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    //leer el usuario que corresponde al uid
    const usuario = await Usuario.findById(uid);
    //verificar que el usuario exista.
    if(!usuario){
      return res.status(401).json({
        msg: 'The user does not exist in the database.'
      })
    }
    //verificar si el uid está habilidato.
    if(!usuario.estado){
      return res.status(401).json({
        msg: 'Invalid token [user is not active].'
      })
    }

    req.usuario = usuario;

    next();
  } catch (e) {
    console.log(e),
      res.status(401).json({
        msg: "Upss!!! Sorry, invalid token",e
      });
  }
}