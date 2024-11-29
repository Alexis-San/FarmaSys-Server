import { DataTypes } from "sequelize";
import db from "../db/connection";

const Usuario = db.define("Usuario", {
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
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  rol: {
    type: DataTypes.STRING,
  },
  logeado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});
/*
Usuario.count().then((count) => {
  if (count === 0) {
    Usuario.create({
      nombre: "Admin",
      email: "admin@example.com",
      password: "adminpassword",
      rol: "admin",
      logeado: false,
      estado: true,
    });
  }
});
*/
export default Usuario;
