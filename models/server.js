const express = require('express')
const cors = require('cors');
const {dbConnection} = require('../database/config')

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //Conexion DB
        this.dataBase();
        //PATH
        this.paths = {
            user:     '/api/users',
            auth:     '/api/auth',
            category: '/api/category',
            product:  '/api/products',
            find:     '/api/find',
        };
        //Middleware
        this.middlewares();
        //Routes of the app
        this.routes();
    }

    async dataBase() {
        await dbConnection();
    }

    middlewares() {
        //CORS
        this.app.use(cors());
        //Directorio publico
        this.app.use(express.static('public'));
        //Lectura y parseo del body
        this.app.use(express.json());

    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth.routes'));
        this.app.use(this.paths.user, require('../routes/user.routes'));
        this.app.use(this.paths.category, require('../routes/category.routes'));
        this.app.use(this.paths.product, require('../routes/product.routes'));
        this.app.use(this.paths.find, require('../routes/find.routes'));
    }

    listenPort() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
        })
    }
}

module.exports = Server;