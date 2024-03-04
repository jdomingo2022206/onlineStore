'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import authRoutes from '../src/auth/auth.routes.js';
import userRoutes from '../src/modules/user/user.routes.js';
import categorieRoutes from '../src/modules/categorie/categories.routes.js';
import productRoutes from '../src/modules/product/';
import billRoutes from '../src/modules/bill/';
import shopRoutes from '../src/modules/shop/';
import cartRoutes from '../src/modules/cart/';


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //General routes
        this.authPath = '/onlineStore/v1/auth';
        //Admin Routes
        this.admUserPath = '/onlineStore/v1/adm/user';
        this.admCategoriePath = '/onlineStore/v1/adm/categorie';
        this.admProductPath = '/onlineStore/v1/adm/product';
        this.admBillPath = '/onlineStore/v1/adm/bill';
        //User routes
        this.ussShopPath = '/onlineStore/v1/uss/shop';
        this.ussCartPath = '/onlineStore/v1/uss/cart';
        this.ussBuyPath = '/onlineStore/v1/uss/buy';
        this.ussHistoryPath = '/onlineStore/v1/uss/history';
        this.ussUserPath = '/onlineStore/v1/uss/user';

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
        this.app.use(this.authPath, authRoutes );
        this.app.use(this.admUserPath, userRoutes );
        this.app.use(this.admCategoriePath, categorieRoutes );
        this.app.use(this.admProductPath, productRoutes );
        this.app.use(this.admBillPath, billRoutes );
        this.app.use(this.ussShopPath, shopRoutes );
        this.app.use(this.ussCartPath, cartRoutes );
        this.app.use(this.ussBuyPath, billRoutes);
        this.app.use(this.ussHistoryPath, billRoutes);
        this.app.use(this.ussUserPath, userRoutes);
    }

    // Inicia el servidor y escucha en el puerto especificado
    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port ', this.port);
        });
    }
}

export default Server;