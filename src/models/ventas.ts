import { DataTypes } from "sequelize";
import db from "../db/connection";
import Cliente from "./cliente";
import Usuario from "./usuario";

const Venta = db.define("venta", {
  id_venta: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  id_cliente: {
    type: DataTypes.INTEGER,
    references: {
      model: Cliente,
      key: "id",
    },
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuario,
      key: "id",
    },
  },
  descuento: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    defaultValue: 0,
  },
  monto_final: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});
Cliente.hasMany(Venta, { foreignKey: "id_cliente" });
Venta.belongsTo(Cliente, { foreignKey: "id_cliente" });

Usuario.hasMany(Venta, { foreignKey: "id_usuario" });
Venta.belongsTo(Usuario, { foreignKey: "id_usuario" });
export default Venta;
