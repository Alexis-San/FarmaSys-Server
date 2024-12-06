import { DataTypes, Model } from "sequelize";
import db from "../db/connection";
import Cliente from "./cliente";
import Usuario from "./usuario";

interface VentaAttributes {
  id?: number; // Hacerlo opcional ya que es autoincremental
  id_cliente: number;
  id_usuario: number;
  descuento?: number;
  monto_final?: number; // Hacerlo opcional si se puede calcular después
  estado?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

class Venta extends Model<VentaAttributes> implements VentaAttributes {
  public id!: number;
  public id_cliente!: number;
  public id_usuario!: number;
  public descuento?: number;
  public monto_final!: number;
  public estado!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Venta.init(
  {
    id: {
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
      defaultValue: 0,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: db,
    modelName: "venta",
    tableName: "venta",
  }
);

Cliente.hasMany(Venta, { foreignKey: "id_cliente" });
Venta.belongsTo(Cliente, { foreignKey: "id_cliente" });

Usuario.hasMany(Venta, { foreignKey: "id_usuario" });
Venta.belongsTo(Usuario, { foreignKey: "id_usuario" });

export default Venta;
