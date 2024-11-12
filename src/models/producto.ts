import { DataTypes } from 'sequelize';
import db from '../db/connection';
import actuador from './actuador';
import proveedor from './proveedor';
import categoria from './categoria';



const Producto = db.define('producto', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    codigo_cafapar: {
        type: DataTypes.INTEGER,
    },
    nombre_comercial: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    presentacion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
    },
    precio_venta: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    laboratorio: {
        type: DataTypes.STRING,
    },
    condicion_venta: {
        type: DataTypes.STRING,
        allowNull: false,
    }, //nacional, importado
    procedencia: {
        type: DataTypes.STRING,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

const Producto_Actuador = db.define('producto_actuador', {}, { timestamps: true });
const Producto_Proveedor = db.define('producto_proveedor', {}, { timestamps: true });
const Producto_Categoria = db.define('producto_categoria', {}, { timestamps: true });

Producto.belongsToMany(actuador, { through: Producto_Actuador });
actuador.belongsToMany(Producto, { through: Producto_Actuador });

Producto.belongsToMany(proveedor, { through: Producto_Proveedor });
proveedor.belongsToMany(Producto, { through: Producto_Proveedor });

Producto.belongsToMany(categoria, { through: Producto_Categoria });
categoria.belongsToMany(Producto, { through: Producto_Categoria });

export default Producto;
