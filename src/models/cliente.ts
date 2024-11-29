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
    allowNull: true,
  },
  ci: {
    type: DataTypes.STRING,
    allowNull: true,
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
    defaultValue: "Generico",
  },
  //este campo es para eliminacion logica
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});
/*
// Insert a generic client
Cliente.count().then((count) => {
  if (count === 0) {
    Cliente.create({
      nombre: "Cliente",
      apellido: "Generico",
      tipo_cliente: "Generico",
      estado: true,
    });
  }
});
*/
export default Cliente;
