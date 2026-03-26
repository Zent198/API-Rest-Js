import express from "express";
import userRoutes from "./src/routes/user.routes.js";
import { errorHandler } from "./src/middlewares/error.middleware.js";
import { logger } from "./src/middlewares/logging.middleware.js";
import postRoutes from './src/routes/post.routes.js';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from "swagger-jsdoc";



const app = express();

const swaggerOption = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Usuarios y Posts - Proyecto de Marzo',
            version: '1.0.0',
            description: 'Documentación profesional de mi segunda API REST'
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                },
            },
            
            schemas: {
                ErrorResponse: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean', example: false},
                        error: {
                            type: 'object',
                            properties: {
                                status: { type: 'integer', example: 400},
                                message: { type: 'string', example: '"email" must be a valid email'}
                            },
                        },
                    },
                },




                User: {
                    type: 'object',
                    required: ['username', 'email', 'password'],
                    properties: {
                        username: { type: 'string', example: 'luis_dev'},
                        email: { type: 'string', example: 'luis@correo.com'},
                        password: { type: 'string', example: '123456'}
                    },

                },
                Post: {
                    type: 'object',
                    required: ['title', 'content'],
                    properties: {
                        title: { type: 'string', example: 'La primera API de la historia'},
                        content: { type: 'string', example: 'La primera API se contruyo en...' }
                    },
                },
            },
           
        },
    },
    apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOption);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());

app.use(logger);

app.use('/uploads', express.static('uploads'));

app.use(cors());
app.use('/users', userRoutes);
app.use('/post', postRoutes);
app.use(errorHandler);

export default app;