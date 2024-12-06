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
  createdAt?: Date;
  updatedAt?: Date;
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

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

VentaDetalle.init(
  {
    id_venta: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Venta,
        key: "id",
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

VentaDetalle.belongsTo(Inventario, {
  foreignKey: "id_producto_inventario",
  as: "Inventario",
});

Inventario.hasMany(VentaDetalle, {
  foreignKey: "id_producto_inventario",
  as: "VentaDetalles",
});

export default VentaDetalle;
