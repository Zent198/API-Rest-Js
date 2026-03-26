import pool from "../config/db.js";

export const createPostRepository = async (title, content, userId, imageUrl) =>{
    const query = 'INSERT INTO posts(title, content, user_id, image_url) Values(?, ?, ?, ?) ';
    const [result] = await pool.execute(query, [title, content, userId, imageUrl]);
    return result.insertId;

};

export const getAllPostsRepository = async () => {
    const query = `
    SELECT p.*, u.name as author 
    FROM posts p
    JOIN users u ON p.user_id = u.id
    WHERE p.deleted_at IS NULL
    `;

    const [rows] = await pool.execute(query);
    return rows;
};

export const softDeletePostRepository = async (postId) =>{
    const query = 'UPDATE posts SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?';
    await pool.execute(query,[postId]);
};

export const getPostByIdRepository = async (postId) => {
    const query = 'SELECT * FROM posts WHERE id = ? AND deleted_at IS NULL';
    const [rows] = await pool.execute(query,[postId]);
    return rows[0];
};

export const updatePostByIdRepository = async (title, content, postId) => {
    const query = 'UPDATE posts SET title= ?, content= ? WHERE id = ?';
    const [result] = await pool.execute(query,[title,content,postId]);
    return{
        title,
        content
    }
};