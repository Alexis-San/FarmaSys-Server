import { DataTypes } from "sequelize";
import db from "../db/connection";
import producto from "./producto";
import Venta from "./ventas";
import VentaDetalle from "./ventaDetalle";

const inventario = db.define("inventario", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  precio_venta: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  precio_compra: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
  },
  fecha_vencimiento: {
    type: DataTypes.DATE,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  lote: {
    type: DataTypes.STRING,
  },
  //este campo es para eliminacion logica
  estado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

inventario.belongsToMany(Venta, {
  through: VentaDetalle,
  foreignKey: "id_producto_inventario",
});
Venta.belongsToMany(inventario, {
  through: VentaDetalle,
  foreignKey: "id_venta",
});

export default inventario;
