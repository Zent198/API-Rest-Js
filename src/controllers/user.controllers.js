import * as usuarioService from '../service/user.service.js'

// utilizando el modelo por capas, esto pertenece al service...
export const getUsers = async (req, res, next) =>{
    try { 

    const obtenerU = await usuarioService.getUsers();
        
    return res.status(200).json(obtenerU);
        
    }catch(error){
        next(error);
    }
}

export const getUserById = async (req, res, next) =>{
    try {
    const id = Number(req.params.id);
    const USERS = await usuarioService.getUserById(id);

        return res.json(USERS);
    }catch(error){
        next(error);
    }
}


export const CreateUser = async (req, res, next) => {
    try {
        const {name, email, password} = req.body;

        const usuarioCreado = await usuarioService.CrearUsuario({name, email, password});
       return res.status(201).json(usuarioCreado);
    }catch(error){
       next(error);
    }
    
}

export const UpdateUserById = async (req, res, next) => {
    try {
    console.log("ENTRO AL UPDATE");
    const id = Number(req.params.id);
    const {name, email, password} = req.body;


    const updateUser = await usuarioService.UpdateUserById(id,{name, email, password});
    return res.status(200).json(updateUser);
}catch(error){
    next(error)
}

}

export const deleteUserById = async (req, res, next) => {
   try {
    const id = Number(req.params.id);


      
    const deleteUser = await usuarioService.deleteUserById(id);

    return res.status(204).json({ message: 'Usuario eliminado'});
    }catch (error){
        next(error);
    }
}

export const restoreUserController = async (req, res, next) => {
    try {
        const {id} = req.params;
    
        const user = await usuarioService.restoreUser(Number(id));

        res.status(200).json({
        message : "Usuario restaurado correctamente",
        data : user
        });
    }catch(error){
        next(error);
    }

}

export const loginUser = async (req, res, next) => {
    try{ 
        const {email, password} = req.body;

        const user = await usuarioService.login(email, password);

        res.status(200).json({
            message: "Acceso concedido",
            data: user  
        });
    }catch(error){
        next(error);
    }
}
