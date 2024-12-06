import { DataTypes, Model } from "sequelize";
import db from "../db/connection";

interface ActuadorAttributes {
  id: number;
  nombre: string;
  estado?: boolean;
}

class Actuador extends Model<ActuadorAttributes> implements ActuadorAttributes {
  public id!: number;
  public nombre!: string;
  public estado!: boolean;
}

Actuador.init(
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
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize: db,
    modelName: "Actuador",
    tableName: "Actuadores",
  }
);

export default Actuador;
