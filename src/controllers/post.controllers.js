import * as postService from '../service/post.service.js';


export const createPost = async (req, res, next) => {
   try {
        const {title, content} = req.body;

        const userId = req.user.id;

        const imageUrl = req.file ? req.file.filename : null;

        const postId = await postService.createPost(title, content, userId, imageUrl);

       return res.status(201).json({
            message: 'Post creado con éxito',
            success: true,
            data: {
                id: postId,
                title,
                content,
                image: imageUrl
            }
        });
    }catch(error){
        next(error);
    }
};

export const getAllPosts = async (req, res, next) =>{
    try {
        const post = await postService.getAllPosts();
       return res.status(200).json({
        data: post
        });
    }catch(error){
        next(error);
    }
};

export const getPostById = async (req, res, next) => {
    try {
        const {id} = req.params;
      const post =  await postService.getPostById(id);

      return  res.status(200).json(post);
    } catch (error) {
        next(error);
    }
};

export const deletePost = async (req, res, next) =>{
    try {
        const {id} = req.params;
        const userId = req.user.id;

        await postService.deletedPost(id, userId);
       return res.status(200).json({ message: "Post eliminado correctamente"});

    } catch (error) {
        next(error);
    }
};

export const updatePost = async (req, res, next) => {
    try {
        const {id} = req.params;
        const {title, content} = req.body;
        const userId = req.user.id;

      const post =  await postService.updatePost(title, content, id, userId);
       return res.status(200).json({
            message : "Sea actualizado con exito",
            data: post
        });
        
    } catch (error) {
        next(error);
    }
};