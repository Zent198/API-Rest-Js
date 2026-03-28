import pool from "../config/db.js";


export const crearUsuarioRepository = async (name, email, password) => {
    const query = 'INSERT INTO users(name, email, password) VALUES(? , ? , ?)';
    const [resultado] = await pool.execute(query, [name, email, password]);

    return {
        id: resultado.insertId,
        name,
        email
    };
}

export const obtenerUsuariosRepository = async () => {
    const [rows] = await pool.query("SELECT id, name, email, created_at FROM users WHERE deleted_at IS NULL");
    return rows;
};

export const obtenerUByIdRepository = async (id) => {
    const query = `SELECT id, name, email, deleted_at, created_at 
    FROM users WHERE id = ? AND deleted_at IS NULL`;
    const [rows] = await pool.execute(query,[id]);

    return rows.length > 0 ? rows[0] : null;
   
}

export const ActualizarUserByIdRepository = async (id,{name, email, password}) =>{
    const query = 'UPDATE users SET name= ?, email= ?, password= ? WHERE id = ? ';
    const [result] = await pool.execute(query, [name, email, password, id ]);

    if(result.affectedRows === 0) return null;

    return{id, name, email};
}

export const BorrarUsuarioRepository = async (id) => {
    const query = 'UPDATE users SET deleted_at = NOW() WHERE id = ?';
    const [result] = await pool.execute(query, [id]);

    return result.affectedRows > 0;
    
}

export const EmailExist = async (email) => {

    const query = 'SELECT * FROM users WHERE email = ? LIMIT 1';
    const [rows] = await pool.execute(query, [email]);

    return rows.length > 0 ? rows[0]: null;
} 

export const restaurarUsuarioRepository = async (id) => {
    
    const query = 'UPDATE users SET deleted_at = null WHERE id = ?';
    const [result] = await pool.execute(query, [id]);

    return result.affectedRows > 0;
}

