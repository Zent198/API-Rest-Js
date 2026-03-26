import express from "express";
const router = express.Router();
import * as controllers from "../controllers/user.controllers.js"; // otra forma: import {getUsers, getUserById, etc...}.
import { createUserSchema, loginUserSchema } from "../schemas/user.schema.js";
import { idSchema } from "../schemas/shared.schema.js";
import { validateSchema } from "../middlewares/validator.middleware.js"; 
import { verifyToken } from "../middlewares/auth.middleware.js";

/**
 * @swagger
 * /users:
 *   get:
 *     summary: obtiene todos los usuarios
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida con éxito
 *       401:
 *         description: Token no proporcionado o inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

router.get('/', verifyToken, controllers.getUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtiene un usuario por el ID
 *     tags: [Users]
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
 *         description: Usuario encontrado
 *       401:
 *         description: Token no proporcionado o inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

router.get('/:id', validateSchema(idSchema, 'params'), verifyToken, controllers.getUserById);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario creado con éxito
 *       400: 
 *         description: Error de validación en los datos enviados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'         
 */
router.post('/', validateSchema(createUserSchema), controllers.CreateUser);

/**
 * @swagger
 * /users/login: 
 *   post:
 *     summary: Iniciar sesion
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *         required: [email, password]
 *         properties:
 *           email: {type: 'string', example: 'usuario@correo.com' }
 *           password: {type: 'string', example: '1234'}
 *     responses:
 *       200:
 *         description: Acceso concedido
 *       400: 
 *         description: Error de validación en los datos enviados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/login', validateSchema(loginUserSchema), controllers.loginUser );

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Actualiza el usuario por el ID
 *     tags: [Users]
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
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuario actualizado con éxito
 *       401: 
 *         description: Token no proporcionado o inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/:id', verifyToken,validateSchema(idSchema, 'params'), validateSchema(createUserSchema), controllers.UpdateUserById);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Elimina el usuario por el ID
 *     tags: [Users]
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
 *         description: Usuario eliminado
 *       401: 
 *         description: Token no proporcionado o inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'        
 */
router.delete('/:id',validateSchema(idSchema, 'params'), verifyToken, controllers.deleteUserById);

/**
 * @swagger
 * /users/{id}/restore:
 *   patch:
 *     summary: Restaura un usuario eliminado
 *     tags: [Users]
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
 *         description: El usuario es restaurado y devuelve el usuario
 *       401: 
 *         description: Token no proporcionado o inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.patch('/:id/restore', validateSchema(idSchema, 'params'), verifyToken, controllers.restoreUserController);

export default router;