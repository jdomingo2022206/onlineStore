import { response } from 'express';
import bcryptjs from 'bcryptjs';
import User from '../modules/user/user.model.js';
import { generarteJWT } from '../helpers/generate-jwt.js'; 

export const login = async (req, res) => {
    const { mail, password} = req.body;
    try{
        const user = await User.findOne({ mail: mail });
        if(!user){
            return res.status(400).json({
                msg: 'The email is not registered in the database.'
            })
        }

        // verificar si el user está activo
        if(!user.estado){
            return res.status(400).json({
                msg: 'The user does not exist in database.'
            })
        }
        // verificar que la contraseña sea la correcta
        const validPassword = bcryptjs.compareSync(password, user.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'Incorrect password.'
            })
        }

        const token = await generarteJWT(user.id);

        res.status(200).json({
            msg: 'Login ok',
            user,
            token
        });

    }catch(e){
        console.log(e);
        res.status(500).json({
            msg: 'Please contact the administrator/support.'
        })
    }
}