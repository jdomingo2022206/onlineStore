import jwt from 'jsonwebtoken'
import Usuario from '../users/user.model.js'

export const validarJWT = async (req, res, next) => {
    const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "There was no token provided.",
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
        msg: 'Token invalid [user is not active].'
      })
    }

    req.usuario = usuario;

    next();
  } catch (e) {
    console.log(e),
      res.status(401).json({
        msg: "Invalid token.",
      });
  }
}