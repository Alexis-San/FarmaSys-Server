import { DataTypes } from 'sequelize';
import db from '../db/connection';

const categoria = db.define('categoria',{

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
    descripcion:{
        type:DataTypes.TEXT,  
    },
})

export default categoria;