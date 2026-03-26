 import * as usuarioRepo from '../Repository/user.repository.js';
 import { HttpError } from '../utils/HttpError.js';
 import bcrypt from 'bcrypt';
 import jsonwebtoken from 'jsonwebtoken';
 import { config } from '../config/confg.js';

export const CrearUsuario = async ({name, email, password}) => {
    const saltRounds = 10;
    
    if(!email.includes('@')|| email.length < 3  ){
        throw new HttpError("El email esta mal escrito");
    }

    if(name.length < 3 || !/^[A-Z]/.test(name)) {
        throw new HttpError("El nombre debe empezar con mayúscula y tener más de 3 caracteres");
    }
    
    const EmailEX = await usuarioRepo.EmailExist(email);

    if (EmailEX){
        throw new HttpError("EL email ya existe");
    }

    if(password.length < 3){
        throw new HttpError("El password debe tener más de 3 caracteres")
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

        return await usuarioRepo.crearUsuarioRepository(name, email,hashedPassword);
}

export const getUsers = async () => {
    const user = await usuarioRepo.obtenerUsuariosRepository();

    if(!user){
        throw new HttpError("Usuario no encontrado", 404);
    }
    return user;
}


export const getUserById = async (id) => {
    const user = await usuarioRepo.obtenerUByIdRepository(id);

    if(!user || user.deleted_at !== null){
        throw new HttpError("Usuario no encontrado", 404);
    }
        return user;
}


export const UpdateUserById = async (id,{name, email, password}) =>{
     const saltRounds = 10;

    if(!name || !email || !password){
        throw new HttpError("FALTAN DATOS", 400);
    }

     if(name.length < 3 || !/^[A-Z]/.test(name)) {
        throw new HttpError("El nombre debe empezar con mayúscula y tener más de 3 caracteres");
    }
    
    const EmailEX = await usuarioRepo.EmailExist(email);

    if (EmailEX && EmailEX.id !== id){
        throw new HttpError("Email no valido",400);
    }

    if(password.length < 3){
        throw new HttpError("El password debe tener más de 3 caracteres")
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const updated = await usuarioRepo.ActualizarUserByIdRepository(id,{name, email, hashedPassword});
    if(!updated) { throw new HttpError("Usuario no encontrado", 404)};
    
    return updated;

}

export const deleteUserById = async (id) => {
    const delet = await usuarioRepo.BorrarUsuarioRepository(id);
    if(!delet) {
        throw new HttpError("El usuario no fue encontrado");
    }
    return true;
}    

export const restoreUser = async (id) => {
    const user = await usuarioRepo.obtenerUByIdRepository(id);

    if(!user) {
        throw new HttpError("Usuario no encontrado");
    }

    if(!user.deletedAT) {
        throw new HttpError("El usuario no esta eliminado");
    }

    const restoredUser = await usuarioRepo.restaurarUsuarioRepository(id);
    return restoredUser;
}

export const login = async (email, password) =>{
    const cleanEmail = email.trim()

     const EmailEX = await usuarioRepo.EmailExist(cleanEmail);

     if(!EmailEX){
        throw new HttpError("Acceso denegado email", 401);
     }

     const isPassword = await bcrypt.compare(password, EmailEX.password);

     if(!isPassword){
        throw new HttpError("Acceso denegado", 401);
     }

     const token = jsonwebtoken.sign(
        {id: EmailEX.id, email: EmailEX.email,},
        config.jwt.secret,
        {expiresIn: config.jwt.expires}
     );
     
     delete EmailEX.password;
     return {
        user: EmailEX,
        token: token
     };
}