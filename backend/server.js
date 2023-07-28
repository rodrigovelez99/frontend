const express =  require('express');
const cors = require('cors');

const { dbConnection } =  require('./database/config');


class Server 
{
    constructor()
    {
        this.app = express.Router();
        this.router = express.Router();

        this.port = process.env.PORT;

        this.paths = {
            carreras: '/api/carreras',
            corredores: '/api/corredores',
            seguimientos: '/api/seguimientos'
        }

        this.connectDB();
        this.middlewares();
        this.routes();
        this.router.use('/v1/control', this.app);
        this._express = express().use(this.router);
    }
    async connectDB(){
        await dbConnection();
    }
    middlewares(){
        this.app.use(cors());
        this.app.use(express.json())
        this.app.use(express.static('public'));
        this.app.use( '/uploads/', express.static('uploads'))

    }
    routes(){
        this.app.use(this.paths.seguimientos, require('./routes/seguimiento')   )
        this.app.use(this.paths.carreras, require('./routes/carrera')   )
        this.app.use(this.paths.corredores, require('./routes/corredor')   )
    }

    listen(){
        this._express.listen(this.port, ()=>{
            console.log(`Servidor ejecuntando en puerto ${this.port}`)
        })
    }


}


module.exports = Server;