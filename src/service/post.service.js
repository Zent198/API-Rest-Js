import * as postRepo from '../Repository/post.repository.js';
import {HttpError} from '../utils/HttpError.js';

export const createPost = async (title, content, userId) => {
    if(!title || !content){
        throw new HttpError("Título y contenido son obligatorios", 400);
    }

    return postRepo.createPostRepository(title, content, userId);
};

export const getAllPosts = async () => {
    return postRepo.getAllPostsRepository();
};

export const getPostById = async (postId) =>{
    const post = await postRepo.getPostByIdRepository(postId);

    if(!post){
        throw new HttpError("El post no existe", 404);
    }

    return post;
}

export const deletedPost = async (postId, userId) => {
    const post = await postRepo.getPostByIdRepository(postId);

    if(!post) {
    throw new HttpError("El post no existe", 404);
    }

    if(post.user_id !== userId){
        throw new HttpError("No tienes permiso para borrar este post", 403);
    }

    return await postRepo.softDeletePostRepository(postId);
};

export const updatePost = async (title, content, postId, userId) => {
    if(!title || !content){
        throw new HttpError("Título y contenido son obligatorios", 400);
    }

    const udPost = await postRepo.getPostByIdRepository(postId);

    if(!udPost){
        throw new HttpError("el post no existe", 404);
    }

    if(udPost.user_id !== userId){
        throw new HttpError("No tienes permiso para realizar cambios en este post", 403);
    }


    return await postRepo.updatePostByIdRepository(title, content, postId);
};
