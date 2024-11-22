import { DataTypes } from "sequelize";
import db from "../db/connection";

const Cliente = db.define("cliente", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tipo_cliente: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "normal",
  },
  //este campo es para eliminacion logica
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

export default Cliente;
