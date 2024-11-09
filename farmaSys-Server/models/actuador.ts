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
    
})

export default actuador;