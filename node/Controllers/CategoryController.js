//importamos el Modelo
import CategoryModel from "../Models/CategoryModel.js";

//** Métodos para el CRUD **/

// Mostrar todas las categorías
export const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.findAll();
    res.json(categories);
  } catch (error) {
    console.error('Error al obtener las categorías:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Mostrar una categoría
export const getCategory = async (req, res) => {
  try {
    const category = await CategoryModel.findByPk(req.params.id);
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ message: "Categoría no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear una categoría
export const createCategory = async (req, res) => {
  try {
    await CategoryModel.create(req.body);
    res.json({
      message: "¡Categoría creada correctamente!",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Actualizar una categoría
export const updateCategory = async (req, res) => {
  try {
    const category = await CategoryModel.findByPk(req.params.id);
    if (category) {
      await CategoryModel.update(req.body, {
        where: { Id: req.params.id },
      });
      res.json({ message: "¡Categoría actualizada correctamente!" });
    } else {
      res.status(404).json({ message: "Categoría no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar una categoría
export const deleteCategory = async (req, res) => {
  try {
    const category = await CategoryModel.findByPk(req.params.id);
    if (category) {
      await CategoryModel.destroy({ where: { Id: req.params.id } });
      res.json({ message: '¡Categoría eliminada correctamente!' });
    } else {
      res.status(404).json({ message: 'Categoría no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
