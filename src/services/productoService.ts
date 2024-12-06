import { Op } from "sequelize";
import Producto from "../models/producto";
import Actuador from "../models/actuador";
import Categoria from "../models/categoria";
import Proveedor from "../models/proveedor";
import Laboratorio from "../models/laboratorio"; // Add this import
import { ProductoAttributes } from "../interfaces/productoInterfaz";

// En productoService.ts
export const obtenerProductos = async () => {
  try {
    const productos = await Producto.findAll({
      where: { estado: true },
      attributes: [
        "id",
        "codigo_cafapar",
        "nombre_comercial",
        "presentacion",
        "descripcion",
        "precio_venta",
        "condicion_venta",
        "procedencia",
      ],
      include: [
        {
          model: Actuador,
          attributes: ["id", "nombre"],
          as: "Actuadores",
        },
        {
          model: Categoria,
          attributes: ["id", "nombre"],
          as: "Categorias",
        },
        {
          model: Proveedor,
          attributes: ["id", "nombre"],
          as: "Proveedores",
        },
        {
          model: Laboratorio,
          attributes: ["id", "nombre"],
          as: "Laboratorio",
        },
      ],
    });

    if (!productos) {
      throw new Error("No se encontraron productos");
    }

    return productos;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error al obtener los productos: ${error.message}`);
    }
    throw new Error("Error desconocido al obtener los productos");
  }
};

export const buscarProductos = async (termino: string) => {
  try {
    const terminoMayusculas = termino.toUpperCase();
    return await Producto.findAll({
      where: {
        [Op.and]: [
          { estado: true },
          {
            [Op.or]: [
              { nombre_comercial: { [Op.like]: `%${terminoMayusculas}%` } },
              { presentacion: { [Op.like]: `%${terminoMayusculas}%` } },
            ],
          },
        ],
      },
      attributes: [
        "id",
        "codigo_cafapar",
        "nombre_comercial",
        "presentacion",
        "descripcion",
        "precio_venta",
        "condicion_venta",
        "procedencia",
        "laboratorioId",
      ],
    });
  } catch (error) {
    throw new Error(`Error al buscar productos: ${error}`);
  }
};

export const obtenerProductoPorId = async (id: string) => {
  try {
    return await Producto.findOne({
      where: {
        id,
        estado: true,
      },
      attributes: [
        "id",
        "codigo_cafapar",
        "nombre_comercial",
        "presentacion",
        "descripcion",
        "precio_venta",
        "condicion_venta",
        "procedencia",
        "laboratorioId",
      ],
    });
  } catch (error) {
    throw new Error(`Error al obtener el producto con id ${id}: ${error}`);
  }
};

// En productoService.ts
export const crearProducto = async (body: any) => {
  try {
    console.log("Body completo recibido:", body);

    // Asegurar que los arrays existan, incluso vacíos
    const {
      actuadores = [],
      categorias = [],
      proveedores = [],
      ...productoData
    } = body;

    console.log("Datos parseados:", {
      actuadores,
      categorias,
      proveedores,
    });

    // Crear el producto primero
    const producto = await Producto.create({
      ...productoData,
      nombre_comercial: productoData.nombre_comercial.toUpperCase(),
      presentacion: productoData.presentacion.toUpperCase(),
      descripcion: productoData.descripcion
        ? productoData.descripcion.toUpperCase()
        : null,
      condicion_venta: productoData.condicion_venta.toUpperCase(),
      procedencia: productoData.procedencia.toUpperCase(),
    });

    // Establecer las relaciones si existen
    if (actuadores.length > 0) {
      await producto.setActuadores(actuadores);
    }

    if (categorias.length > 0) {
      await producto.setCategorias(categorias);
    }

    if (proveedores.length > 0) {
      await producto.setProveedores(proveedores);
    }

    // Recargar el producto con sus relaciones
    return await Producto.findByPk(producto.id, {
      include: [
        { model: Actuador, as: "Actuadores" },
        { model: Categoria, as: "Categorias" },
        { model: Proveedor, as: "Proveedores" },
      ],
    });
  } catch (error) {
    console.error("Error detallado:", error);
    throw new Error(`Error al crear el producto: ${error}`);
  }
};

export const actualizarProducto = async (id: string, body: any) => {
  try {
    console.log("Iniciando actualización del producto:", { id, body });

    // Extraer las asociaciones del body
    const {
      actuadores = [],
      categorias = [],
      proveedores = [],
      ...productoData
    } = body;

    console.log("Datos parseados:", {
      actuadores,
      categorias,
      proveedores,
      productoData,
    });

    // Buscar el producto
    const producto = await Producto.findOne({
      where: {
        id,
        estado: true,
      },
    });

    if (!producto) {
      throw new Error(`No existe un producto activo con id ${id}`);
    }

    console.log("Producto encontrado:", producto.toJSON());

    // Convertir strings a mayúsculas
    const datosActualizados = {
      ...productoData,
      nombre_comercial: productoData.nombre_comercial?.toUpperCase(),
      presentacion: productoData.presentacion?.toUpperCase(),
      descripcion: productoData.descripcion?.toUpperCase(),
      condicion_venta: productoData.condicion_venta?.toUpperCase(),
      procedencia: productoData.procedencia?.toUpperCase(),
    };

    console.log("Datos a actualizar:", datosActualizados);

    // Actualizar el producto
    await producto.update(datosActualizados);

    // Actualizar asociaciones si se proporcionaron
    if (actuadores.length > 0) {
      await producto.setActuadores(actuadores);
    }
    if (categorias.length > 0) {
      await producto.setCategorias(categorias);
    }
    if (proveedores.length > 0) {
      await producto.setProveedores(proveedores);
    }

    // Retornar producto actualizado con sus relaciones
    const productoActualizado = await Producto.findByPk(id, {
      include: [
        {
          model: Actuador,
          as: "Actuadores",
          through: { attributes: [] },
        },
        {
          model: Categoria,
          as: "Categorias",
          through: { attributes: [] },
        },
        {
          model: Proveedor,
          as: "Proveedores",
          through: { attributes: [] },
        },
      ],
    });

    console.log("Producto actualizado:", productoActualizado?.toJSON());
    return productoActualizado;
  } catch (error) {
    throw new Error(`Error al actualizar el producto con id ${id}: ${error}`);
  }
};

export const desactivarProducto = async (id: string) => {
  try {
    const producto = (await Producto.findOne({
      where: {
        id,
        estado: true,
      },
    })) as ProductoAttributes | null;

    if (!producto) {
      throw new Error(`No existe un producto con la id ${id}`);
    }

    const nuevoNombreComercial = `${producto.nombre_comercial}_deleted_${Date.now()}`;
    return await Producto.update(
      {
        estado: false,
        nombre_comercial: nuevoNombreComercial,
      },
      {
        where: { id },
      }
    );
  } catch (error) {
    throw new Error(`Error al eliminar el producto con id ${id}: ${error}`);
  }
};
