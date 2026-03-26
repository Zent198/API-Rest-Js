import express from "express";;
import * as postControllers from '../controllers/post.controllers.js';
import {verifyToken} from '../middlewares/auth.middleware.js';
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createPostSchema } from "../schemas/post.schema.js";
import { idSchema } from "../schemas/shared.schema.js"; 
import { upload } from "../middlewares/uploads.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /post:
 *   get:
 *     summary: Obtiene todos los Posts
 *     tags: [Post]
 *     responses:
 *       200:
 *         description: Devuelve los Posts
 *       400:
 *         description: Error de validación en los datos enviados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', postControllers.getAllPosts);

/**
 * @swagger
 * /post/{id}:
 *   get:
 *     summary: Obtiene un Post por el ID
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Devuelve el Post referente al ID
 *       401:
 *         description: Token no proporcionado o inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', validateSchema(idSchema, 'params'), postControllers.getPostById);

/**
 * @swagger
 * /post:
 *   post:
 *     summary: Crea un Post
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       201:
 *         description: Post creado con éxito
 *       401:
 *         description: Token no proporcionado o inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', validateSchema(createPostSchema), verifyToken, upload.single('image'), postControllers.createPost);

/**
 * @swagger
 * /post/{id}:
 *   put:
 *     summary: Actualiza el Post de un usuario por el ID pero solo si es el Usuario dueño del Post
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: Sea actualizado con exito y devuelve el Post
 *       401:
 *         description: Token no proporcionado o inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */    

router.put('/:id', validateSchema(idSchema, 'params'), validateSchema(createPostSchema), verifyToken, postControllers.updatePost);

/**
 * @swagger
 * /post/{id}:
 *   delete:
 *     summary: Elimina un Post por ID pero solo si es el dueño del Post
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Post eliminado correctamente
 *       401:
 *         description: Token no proporcionado o inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */     
 
router.delete('/:id', validateSchema(idSchema, 'params'), verifyToken, postControllers.deletePost);
export default router;