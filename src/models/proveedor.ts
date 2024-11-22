import { DataTypes } from "sequelize";
import db from "../db/connection";

const Proveedor = db.define(
  "proveedor",
  {
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
    descripcion: {
      type: DataTypes.TEXT,
    },
    telefono: {
      type: DataTypes.STRING,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "proveedores", // Especifica el nombre de la tabla en la base de datos
  }
);

export default Proveedor;
