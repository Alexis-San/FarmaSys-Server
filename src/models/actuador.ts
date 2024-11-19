import { DataTypes } from 'sequelize';
import db from '../db/connection';

const actuador = db.define('actuadores',{

    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre:{
        type:DataTypes.STRING,
        allowNull: false,
    },
     //este campo es para eliminacion logica
     estado:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    }
    
})

export default actuador;