import {
  Model,
  DataTypes,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyGetAssociationsMixin,
} from "sequelize";
import db from "../db/connection";
import Actuador from "./actuador";
import Proveedor from "./proveedor";
import Categoria from "./categoria";
import Laboratorio from "./laboratorio";
import Inventario from "./inventario";

interface ProductoAttributes {
  id?: number;
  codigo_cafapar?: number;
  nombre_comercial: string;
  presentacion: string;
  descripcion?: string;
  precio_venta: number;
  condicion_venta: "BAJO RECETA" | "VENTA LIBRE";
  procedencia?: "NACIONAL" | "IMPORTADO";
  estado?: boolean;
  laboratorioId?: number;
}

class Producto extends Model<ProductoAttributes> implements ProductoAttributes {
  public id!: number;
  public codigo_cafapar!: number;
  public nombre_comercial!: string;
  public presentacion!: string;
  public descripcion!: string;
  public precio_venta!: number;
  public condicion_venta!: "BAJO RECETA" | "VENTA LIBRE";
  public procedencia!: "NACIONAL" | "IMPORTADO";
  public estado!: boolean;
  public laboratorioId!: number;

  public setActuadores!: BelongsToManyAddAssociationsMixin<Actuador, number>;
  public setCategorias!: BelongsToManyAddAssociationsMixin<Categoria, number>;
  public setProveedores!: BelongsToManyAddAssociationsMixin<Proveedor, number>;
  // Optionally add getter methods if needed
  public getActuadores!: BelongsToManyGetAssociationsMixin<Actuador>;
  public getCategorias!: BelongsToManyGetAssociationsMixin<Categoria>;
  public getProveedores!: BelongsToManyGetAssociationsMixin<typeof Proveedor>;
}

Producto.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    codigo_cafapar: {
      type: DataTypes.INTEGER,
    },
    nombre_comercial: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    presentacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
    },
    precio_venta: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    condicion_venta: {
      type: DataTypes.ENUM("BAJO RECETA", "VENTA LIBRE"),
      allowNull: false,
    },
    procedencia: {
      type: DataTypes.ENUM("NACIONAL", "IMPORTADO"),
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize: db,
    modelName: "Producto",
    tableName: "producto",
    indexes: [
      {
        unique: false,
        fields: ["nombre_comercial"],
      },
    ],
  }
);

// Tablas intermedias
const Producto_Actuador = db.define(
  "producto_actuador",
  {},
  { timestamps: true, tableName: "producto_actuador" }
);

const Producto_Proveedor = db.define(
  "producto_proveedor",
  {},
  { timestamps: true, tableName: "producto_proveedor" }
);

const Producto_Categoria = db.define(
  "producto_categoria",
  {},
  { timestamps: true, tableName: "producto_categoria" }
);

// Asociaciones
Producto.hasMany(Inventario, {
  foreignKey: "productoId",
  sourceKey: "id",
  as: "Inventarios",
});

Producto.belongsTo(Laboratorio, {
  foreignKey: {
    name: "laboratorioId",
    allowNull: true,
  },
  as: "Laboratorio",
});

Producto.belongsToMany(Actuador, {
  through: Producto_Actuador,
  as: "Actuadores",
  foreignKey: "ProductoId", // Match the auto-generated name
});

Actuador.belongsToMany(Producto, {
  through: Producto_Actuador,
  as: "Productos",
  foreignKey: "ActuadorId", // Match the auto-generated name
});

Producto.belongsToMany(Proveedor, {
  through: Producto_Proveedor,
  as: "Proveedores",
  foreignKey: "ProductoId",
});

Proveedor.belongsToMany(Producto, {
  // Falta esta asociación inversa
  through: Producto_Proveedor,
  as: "Productos",
  foreignKey: "ProveedorId",
});

Producto.belongsToMany(Categoria, {
  through: Producto_Categoria,
  as: "Categorias",
  foreignKey: "ProductoId", // Falta esto
});

Categoria.belongsToMany(Producto, {
  // Falta esta asociación inversa
  through: Producto_Categoria,
  as: "Productos",
  foreignKey: "CategoriumId",
});

Inventario.belongsTo(Producto, {
  foreignKey: "productoId",
  as: "producto", // Este alias debe coincidir con el include
});

// En producto.ts
Producto.hasMany(Inventario, {
  foreignKey: "productoId",
  as: "Inventario",
});

export default Producto;
