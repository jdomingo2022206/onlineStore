import User from "../modules/user/user.model.js";
import Role from "../modules/role/role.model.js";
import ProductPublication from "../modules/product/product.model.js";
import Comment from "../modules/comment/comment.model.js";

export const existentEmail = async (mail = '') => {
    console.log('');
    console.log('--- [NOTES] existentEmail.db-validators');
    try {
        const existMail = await User.findOne({mail});
        if(existMail){
            throw new Error(`El email ${ mail } ya fue registrado`);
        }
    } catch (error) {
        console.log('Error al buscar usuario por correo electrónico:', error);
        //console.error('Error al buscar usuario por correo electrónico:', error);
        //throw error; 
    }
}

export const existentUserById = async ( id = '') => {
    console.log('');
    console.log('--- [NOTES] existentUserById.db-validators');
    try {
        const existUser = await User.findOne({id});
        if(existUser){
            throw new Error(`El usuario con el ${ id } no existe`);
        }
    } catch (error) {
        console.log('Error al buscar usuario por id:', error);
        //console.error('Error al buscar usuario por id:', error);
        //throw error;
    }
}

export const roleValid = async (role='') => {
    console.log('');
    console.log('--- [NOTES] roleValid.db-validators');
    try {
        const existRole = await Role.findOne({role});
        if(!existRole){
            throw new Error(`El role ${ role } no existe en base de datos.` )
        }
    } catch (error) {
        console.log('Error al buscar role:', error);
        //console.error('Error al buscar role:', error);
        //throw error;
    }
}

export const existentProductById = async ( id = '') => {
    console.log('');
    console.log('--- [NOTES] existentProductById.db-validators');
    try {
        const existProduct = await Product.findOne({id});
    
        if(existProduct){
            throw new Error(`The product with the ${ id } does not exist in the database.`);
        }
    } catch (error) {
        console.log('Error finding product:', error);
        //console.error('Error al buscar publicacion por id:', error);
        //throw error;
    }
}

export const copyExistentProduct = async (name = '', date ='') => {
    console.log('');
    console.log('--- [NOTES] copyExistentProduct.db-validators');
    try {
        const existProduct = await Product.findOne({name, date});

        if (existProduct) {
            throw new Error(`The product ${name} was already registered.`);
        }
    } catch (error) {
        console.log('Error finding publication by name and date:', error);
        //console.error('Error finding publication by name and date:', error);
        //throw error;
    }
}

export const existentProduct = async (name = '', date='') => {
    console.log('');
    console.log('--- [NOTES] existentProduct.db-validators');
    try {
        const existProduct = await Product.findOne({name, date});
        if(!existProduct){
            throw new Error(`The product with the ${ name } and the date ${date} does not exist in database` )
        }
    } catch (error) {
        console.log('Error finding publication by name and date:', error);
        //console.error('Error finding publication by name and date:', error);
        //throw error;
    }
}

export const copyExistentComment = async ( user = '', date='') => {
    console.log('');
    console.log('--- [NOTES] copyExistentCommentById.db-validators');
    try {
        const existComment = await Comment.findOne({user,date});
        if(!existComment){
            throw new Error(`El comentario con el ${ id } no existe`);
        }
    } catch (error) {
        console.log('Error al buscar comentario por usuario y fecha:', error);
        //console.error('Error al buscar comentario por usuario y fecha:', error);
        //throw error;
    }
}

export const existentCommentById = async ( id = '') => {
    console.log('');
    console.log('--- [NOTES] existentCommentById.db-validators');
    try {
        const existComment = await Comment.findOne({id});
        if(!existComment){
            throw new Error(`El comentario con el ${ id } no existe`);
        }
    } catch (error) {
        console.log('Error al buscar comentario por id:', error);
        //console.error('Error al buscar comentario por id:', error);
        //throw error;
    }
}

export const existUserByEmail  = async (correo='') => {
    console.log('');
    console.log('--- [NOTES] existUserByEmail.db-validators');
    try {
        const user = await User.findOne({correo});
        if (user) {
            return {
                id: user._id,
                name: user.name,
                email: user.mail,
                status: user.estado
            };
        } else {
            console.log(`El user ${ correo } no existe en base de datos.` );
            //throw new Error(`El user ${ correo } no existe en base de datos.` );
            return null; 
        }
    } catch (error) {
        console.log('Error al buscar usuario por correo electrónico:', error);
        //console.error('Error al buscar usuario por correo electrónico:', error);
        throw error; 
    }
}


