import jwt from 'jsonwebtoken';

export const generarteJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(
            payload,
            process.env.SECRETORPRIVATEKEY,
            {
                expiresIn: '1h',
            },
        (err, token) =>{
            err ? (console.log(err),reject('Can not generte token :(')) : resolve(token)
        }   
        )
    })
}
