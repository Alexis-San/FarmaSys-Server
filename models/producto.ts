import { DataTypes } from 'sequelize';
import db from '../db/connection';
import actuador from './actuador';
import proveedor from './proveedor';
import categoria from './categoria';



const Producto=db.define('producto',{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    codigo_cafapar:{
        type:DataTypes.INTEGER,
    },
    nombre_comercial:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    presentacion:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    descripcion:{
        type:DataTypes.TEXT,  
    },
    precio_venta:{
        type:DataTypes.BIGINT,
        allowNull: false,
    },
    laboratorio:{
        type:DataTypes.STRING,
        
    },
    condicion_venta:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    procedencia:{
        type:DataTypes.STRING,
        
    },
    //este campo es para eliminacion logica
    estado:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    }



})


Producto.belongsToMany(actuador, { through:'producto_actuador' });
actuador.belongsToMany(Producto, { through: 'producto_actuador' });

Producto.belongsToMany(proveedor, { through: 'producto_proveedor' });
proveedor.belongsToMany(Producto, { through:  'producto_proveedor'  });

Producto.belongsToMany(categoria, { through: 'producto_categoria' });
categoria.belongsToMany(Producto, { through: 'producto_categoria' });

export default Producto;

