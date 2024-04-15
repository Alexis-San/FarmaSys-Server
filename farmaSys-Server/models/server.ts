
import express, {Application} from 'express';
import cors from 'cors';
import * as userRoutes from '../routes/usuario';
import db from '../db/connection';
import { Sequelize } from 'sequelize';
class Server {

    private  app: express.Application;
    private port: string;
    private apiPaths={
        usuarios: '/api/usuarios'
    }

    constructor(){
    this.app=express();
    this.port=process.env.PORT || '8000';

    this.dbConnection();
    //metodos iniciales    
    this.middlewares();
    this.routes();


    

}

async dbConnection(){
    try {
        await db.authenticate();
        await db.sync();
        console.log('database online')
    } catch (error) {
        throw new Error("fallo "+error);
        ;
    }

}

middlewares(){
    //cors
    this.app.use(cors());
    //lectura del body
    this.app.use(express.json());
    //carpeta publica
    this.app.use(express.static('public'));




}

routes(){
    this.app.use(this.apiPaths.usuarios, userRoutes.default)
}

listen(){

    this.app.listen(this.port,()=>{
        console.log('servidor corriendo en '+this.port);
    })

}

}

export default Server;