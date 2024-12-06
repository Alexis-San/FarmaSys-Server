import { Model, DataTypes, BelongsToManyGetAssociationsMixin } from "sequelize";
import db from "../db/connection";
import Producto from "./producto";

interface ProveedorAttributes {
  id: number;
  nombre: string;
  descripcion?: string;
  telefono?: string;
  estado?: boolean;
}

class Proveedor
  extends Model<ProveedorAttributes>
  implements ProveedorAttributes
{
  public id!: number;
  public nombre!: string;
  public descripcion!: string;
  public telefono!: string;
  public estado!: boolean;

  // Add getter for products association
  public getProductos!: BelongsToManyGetAssociationsMixin<Producto>;
}

Proveedor.init(
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
    sequelize: db,
    modelName: "Proveedor",
    tableName: "Proveedores",
  }
);

export default Proveedor;
