import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Usuario=db.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: 'id_usuario',
    },
    nombre:{
        type:DataTypes.STRING},
    email:{
        type:DataTypes.STRING},
    password:{
        type:DataTypes.STRING},
    rol:{
        type:DataTypes.STRING},
    
});

export default Usuario;