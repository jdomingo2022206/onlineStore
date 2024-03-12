'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import userRoutes from '../src/modules/user/user.routes.js';
import authRoutes from '../src/auth/auth.routes.js';
import categoryRoutes from '../src/modules/category/category.routes.js';
import productRoutes from '../src/modules/product/product.routes.js';
import cartRoutes from '../src/modules/cart/cart.routes.js';
import billRoutes from '../src/modules/bill/bill.routes.js';
// import commentRoutes from '../src/modules/comment/comment.routes.js';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/onlineStore/v1/user';
        this.authPath = '/onlineStore/v1/auth';
        this.productPath = '/onlineStore/v1/product';
        this.cartPath = '/onlineStore/v1/cart';
        this.billPath = '/onlineStore/v1/bill';
        // this.commentPath = '/onlineStore/v1/comment';
        this.categoryPath = '/onlineStore/v1/category';

        this.middlewares();  // Configura los middleware de la aplicación
        this.conectarDB();  // Establece la conexión a la base de datos
        this.routes();  // Configura las rutas de la aplicación
    }

    // Conecta a la base de datos MongoDB
    async conectarDB() {
        await dbConnection();
    }

    // Configura los middleware de la aplicación
    middlewares() {
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    // Configura las rutas de la aplicación
    routes() {
        this.app.use(this.userPath, userRoutes);
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.productPath, productRoutes);
        this.app.use(this.cartPath, cartRoutes);
        this.app.use(this.billPath, billRoutes);
        // this.app.use(this.commentPath, commentRoutes);
        this.app.use(this.categoryPath, categoryRoutes);
    }

    // Inicia el servidor y escucha en el puerto especificado
    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port ', this.port);
        });
    }
}

export default Server;

/*
if port 10433 is in use:

netstat -ano | findstr :10433
taskkill /PID 21060 /F
*/ 