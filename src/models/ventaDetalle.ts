import { DataTypes } from "sequelize";
import db from "../db/connection";
import Venta from "./ventas";
import Inventario from "./inventario";

const VentaDetalle = db.define("ventaDetalle", {
  id_venta: {
    type: DataTypes.INTEGER,
    references: {
      model: Venta,
      key: "id_venta",
    },
  },
  id_producto_inventario: {
    type: DataTypes.INTEGER,
    references: {
      model: Inventario,
      key: "id",
    },
  },
  precio: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  monto_total: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
});

export default VentaDetalle;
