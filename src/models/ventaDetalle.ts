import { DataTypes, Model } from "sequelize";
import db from "../db/connection";
import Venta from "./ventas";
import Inventario from "./inventario";

interface VentaDetalleAttributes {
  id_venta: number;
  id_producto_inventario: number;
  precio: number;
  cantidad: number;
  monto_total: number;
  estado?: boolean;
}

class VentaDetalle
  extends Model<VentaDetalleAttributes>
  implements VentaDetalleAttributes
{
  public id_venta!: number;
  public id_producto_inventario!: number;
  public precio!: number;
  public cantidad!: number;
  public monto_total!: number;
  public estado!: boolean;
}

VentaDetalle.init(
  {
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
      defaultValue: 0, //precio*cantidad
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize: db,
    modelName: "ventaDetalle",
    tableName: "ventaDetalle",
  }
);

export default VentaDetalle;
