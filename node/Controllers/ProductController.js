//importamos el Modelo
import ProductModel from "../Models/ProductModel.js";
import { Op } from 'sequelize';

//** Métodos para el CRUD **/

//Mostrar todos los registros
export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.findAll();

    // Convierte las imágenes de los productos a cadenas base64 antes de enviar la respuesta
    const productsWithBase64Images = products.map(product => ({
      ...product.toJSON(),
      ProductImageBase64: product.ProductImage.toString('base64'),
    }));

    res.json(productsWithBase64Images);
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
//Mostrar un registro
export const getProduct = async (req, res) => {
  try {
    const product = await ProductModel.findByPk(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { ProductName, Descripiton1, Descripiton2, CategoryId, Price, Quantity, DateAdded, Vendidos } = req.body;
    const ProductImage = req.file ? req.file.buffer : null;

    const updateData = {
      ProductName, 
      Descripiton1, 
      Descripiton2, 
      CategoryId, 
      Price, 
      Quantity, 
      DateAdded, 
      Vendidos
    };

    if (ProductImage) {
      updateData.ProductImage = ProductImage;
    }

    await ProductModel.update(
      updateData,
      { where: { Codigo: req.params.id } }
    );

    res.json({ message: 'Producto actualizado correctamente' });
  } catch (error) {
    res.json({ message: error.message });
  }
};


export const createProduct = async (req, res) => {
  try {
    const { ProductName, Descripiton1, Descripiton2, CategoryId, Price, Quantity } = req.body;
    const ProductImage = req.file ? req.file.buffer : null;

    await ProductModel.create({
      ProductName,
      Descripiton1,
      Descripiton2,
      CategoryId,
      Price,
      Quantity,
      DateAdded: new Date(),
      Vendidos: 0,
      ProductImage
    });

    res.json({
      message: "¡Producto creado correctamente!",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//Eliminar un registro
export const deleteProduct = async (req, res) => {
    try {
      const product = await ProductModel.findByPk(req.params.id);
      if (product) {
        await ProductModel.destroy({ where: { Codigo: req.params.id } });
        res.json({ message: '¡Producto eliminado correctamente!' });
      } else {
        res.status(404).json({ message: 'Producto no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  export const getProductByName = async (req, res) => {
    try {
      const { name } = req.params; // Obtener el parámetro de la URL
      const products = await ProductModel.findAll({
        where: {
          ProductName: {
            [Op.like]: `%${name}%`, // Usar el nombre recibido para la búsqueda
          },
        },
      });
  
      res.json(products);
    } catch (error) {
      console.error('Error al obtener los productos por nombre:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  };

  export const searchProducts = async (req, res) => {
    try {
      const { query, type } = req.query;
  
      let searchCondition = {};
  
      if (type === 'categoria') {
        const id = parseInt(query, 10);
        if (!isNaN(id)) {
          searchCondition = { CategoryId: id };
        } else {
          return res.status(400).json({ message: 'El valor de ID debe ser un número' });
        }
      } else if (type === 'nombre') {
        searchCondition = { ProductName: { [Op.like]: `%${query}%` } };
      } else if (type === 'Descripcion') {
        searchCondition = { Descripcion1: { [Op.like]: `%${query}%` } };
      } else {
        return res.status(400).json({ message: 'Tipo de búsqueda no válido' });
      }
  
  
      const products = await ProductModel.findAll({ where: searchCondition });
      
      // Codificar la imagen en base64 antes de enviar los datos al cliente
      const productsWithImages = products.map(product => {
        return {
          ...product.dataValues,
          ProductImageBase64: product.ProductImage ? product.ProductImage.toString('base64') : null
        };
      });
  
      res.json(productsWithImages);
    } catch (error) {
      console.error('Error al buscar los productos:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  };
  