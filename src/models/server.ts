import express, { Application } from "express";
import cors from "cors";
import db from "../db/connection";
import * as actuadoresRoutes from "../routes/actuadorRoute";
import * as categoriasRoutes from "../routes/categoriaRoute";
import * as clientesRoutes from "../routes/clienteRoute";
import * as laboratoriosRoutes from "../routes/laboratorioRoutes";
import * as productosRoutes from "../routes/productoRoute";
import * as userRoutes from "../routes/usuarioRoute";

import * as proveedoresRoutes from "../routes/proveedorRoutes";
class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    actuadores: "/api/actuadores",
    categorias: "/api/categorias",
    clientes: "/api/clientes",
    laboratorios: "/api/laboratorios",
    productos: "/api/productos",
    usuarios: "/api/usuarios",
    proveedores: "/api/proveedores",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8000";
    // Conectar a base de datos
    console.log("Initializing dbConnection");
    this.dbConnection();
    // Métodos iniciales
    this.middlewares();
    this.routes();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  async dbConnection() {
    try {
      console.log("Connecting to database");
      await db.authenticate();
      console.log("Database authenticated");
      console.log("Database synced");
      console.log("Database online");
      await db.sync({ force: false }); //force true para borrar la base de datos
    } catch (error) {
      throw new Error("Error al crear modelos " + error);
    }
  }

  middlewares() {
    // CORS
    this.app.use(cors());
    // Lectura del body
    this.app.use(express.json());
    // Carpeta pública
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.apiPaths.actuadores, actuadoresRoutes.default);
    this.app.use(this.apiPaths.categorias, categoriasRoutes.default);
    this.app.use(this.apiPaths.clientes, clientesRoutes.default);
    this.app.use(this.apiPaths.laboratorios, laboratoriosRoutes.default);
    this.app.use(this.apiPaths.productos, productosRoutes.default);
    this.app.use(this.apiPaths.usuarios, userRoutes.default);
    this.app.use(this.apiPaths.proveedores, proveedoresRoutes.default);
  }
}

export default Server;
