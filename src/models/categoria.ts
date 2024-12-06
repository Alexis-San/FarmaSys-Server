import { Model, DataTypes } from "sequelize";
import db from "../db/connection";

interface CategoriaAttributes {
  id: number;
  nombre: string;
  descripcion?: string;
  estado?: boolean;
}

class Categoria
  extends Model<CategoriaAttributes>
  implements CategoriaAttributes
{
  public id!: number;
  public nombre!: string;
  public descripcion!: string;
  public estado!: boolean;
}

Categoria.init(
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
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize: db,
    modelName: "Categoria",
    tableName: "Categorias",
  }
);

export default Categoria;
