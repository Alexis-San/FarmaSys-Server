import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Usuario=db.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    nombre:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull: false,
    },
        
    rol:{
        type:DataTypes.STRING
        
    },
    estado:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    }
    
});

export default Usuario;