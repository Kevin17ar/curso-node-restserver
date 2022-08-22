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
        this.userPath = '/api/users';
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
        this.app.use(this.userPath, require('../routes/user.routes'));
    }

    listenPort() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
        })
    }
}

module.exports = Server;