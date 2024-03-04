
export const haveRole = (...role) => {
    return (req, res, next) => {
        if(!req.user){
            return res.status(500).json({
                msg: 'Se quiere verificar un role sin validar el token primero'
            })
        }

        if(!role.includes(req.user.role)){
            return res.status(401).json({
                msg: `Usuario no autorizado, posee un role ${req.user.role}, los role autorizados son ${ role }`
            })
        }

        next()
    }
}