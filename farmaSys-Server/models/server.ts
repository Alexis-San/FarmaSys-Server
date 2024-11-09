
import express from 'express';
import cors from 'cors';
import * as userRoutes from '../routes/usuario';
import * as clientesRoutes from '../routes/cliente';
import * as productosRoutes from '../routes/producto';
import * as actuadoresRoutes from '../routes/actuador';
import db from '../db/connection';

class Server {

    private  app: express.Application;
    private port: string;
    private apiPaths={
        usuarios: '/api/usuarios',
        clientes:'/api/clientes',
        productos:'/api/productos',
        proveedores:'api/proveedores',
        actuadores:'api/actuadores',

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
        await db.sync({force:true});
        console.log('database online')
    } catch (error) {
        throw new Error("fallo "+ error); 
        
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
    this.app.use(this.apiPaths.clientes, clientesRoutes.default)
    this.app.use(this.apiPaths.productos, productosRoutes.default )
    //this.app.use(this.apiPaths.proveedores, productosRoutes.default )
    this.app.use(this.apiPaths.actuadores, actuadoresRoutes.default )
}


listen(){

    this.app.listen(this.port,()=>{
        console.log('servidor corriendo en '+this.port);
    })

}

}

export default Server;