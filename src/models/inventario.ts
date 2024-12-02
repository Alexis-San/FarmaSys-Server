import { DataTypes, Model } from "sequelize";
import db from "../db/connection";
import producto from "./producto";
import Venta from "./ventas";
import VentaDetalle from "./ventaDetalle";

interface InventarioAttributes {
  id: number;
  precio_venta: number;
  precio_compra: number;
  descripcion?: string;
  fecha_vencimiento?: Date;
  stock: number;
  lote?: string;
  estado?: boolean;
}

class Inventario
  extends Model<InventarioAttributes>
  implements InventarioAttributes
{
  public id!: number;
  public precio_venta!: number;
  public precio_compra!: number;
  public descripcion?: string;
  public fecha_vencimiento?: Date;
  public stock!: number;
  public lote?: string;
  public estado!: boolean;

  // Timestamps opcionales
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Inventario.init(
  {
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
  },
  {
    sequelize: db,
    modelName: "inventario",
    tableName: "inventario",
    indexes: [
      {
        fields: ["precio_compra"],
      },
      {
        fields: ["fecha_vencimiento"],
      },
      {
        fields: ["stock"],
      },
      {
        fields: ["lote"],
      },
      {
        fields: ["productoId"],
      },
    ],
  }
);

Inventario.belongsToMany(Venta, {
  through: VentaDetalle,
  foreignKey: "id_producto_inventario",
});
Venta.belongsToMany(Inventario, {
  through: VentaDetalle,
  foreignKey: "id_venta",
});

export default Inventario;
