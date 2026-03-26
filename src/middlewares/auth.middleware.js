import jws from 'jsonwebtoken';
import { HttpError } from '../utils/HttpError.js';
import { config } from '../config/confg.js';

export const verifyToken = (req, res, next) =>{
   const authHeader = req.headers['authorization'];

   if(!authHeader){
    throw new HttpError("No sea proporcionado un token de acceso", 401);
   }

   const token = authHeader.split(' ')[1];
   console.log(token);

   if(!token){
    throw new HttpError("Formato de token invalido", 401);
   }

   try {

        const decoded = jws.verify(token, config.jwt.secret);

        req.user = decoded;

        next();

    }catch(error){
        throw new HttpError("Token inválido o expirado", 403);
    }
}