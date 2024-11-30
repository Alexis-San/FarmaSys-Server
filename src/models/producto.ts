import { DataTypes } from "sequelize";
import db from "../db/connection";
import actuador from "./actuador";
import proveedor from "./proveedor";
import categoria from "./categoria";
import laboratorio from "./laboratorio";
import inventario from "./inventario";

const Producto = db.define(
  "producto",
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
    }, //nacional, importado
    procedencia: {
      type: DataTypes.ENUM("NACIONAL", "IMPORTADO"),
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    indexes: [
      {
        unique: false,
        fields: ["nombre_comercial"],
      },
    ],
  }
);

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

// Definición del modelo Producto
Producto.hasMany(inventario, {
  foreignKey: "productoId",
  sourceKey: "id",
});
inventario.belongsTo(Producto, {
  foreignKey: "productoId",
  targetKey: "id",
});
// Definición del modelo Laboratorio
Producto.belongsTo(laboratorio, {
  foreignKey: {
    name: "laboratorioId",
    allowNull: true,
  },
  targetKey: "id",
});
laboratorio.hasMany(Producto, {
  foreignKey: {
    name: "laboratorioId",
    allowNull: true,
  },
  sourceKey: "id",
});

Producto.belongsToMany(actuador, { through: Producto_Actuador });
actuador.belongsToMany(Producto, { through: Producto_Actuador });

Producto.belongsToMany(proveedor, { through: Producto_Proveedor });
proveedor.belongsToMany(Producto, { through: Producto_Proveedor });

Producto.belongsToMany(categoria, { through: Producto_Categoria });
categoria.belongsToMany(Producto, { through: Producto_Categoria });

export default Producto;
