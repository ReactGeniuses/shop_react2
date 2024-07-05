import UsuarioModel from "../Models/UsuarioModel.js";
import { Op } from 'sequelize';

// Show all users
export const getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await UsuarioModel.findAll();
    res.json(usuarios);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Show one user
export const getUsuario = async (req, res) => {
  try {
    const usuario = await UsuarioModel.findByPk(req.params.email);
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a user
export const createUsuario = async (req, res) => {
  try {
    console.log(req.body);
    await UsuarioModel.create(req.body);
    res.json({
      message: "User created successfully!",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};


// Método para actualizar un usuario
export const updateUsuario = async (req, res) => {
  try {

    // Busca el usuario por su email
    const usuario = await UsuarioModel.findByPk(req.params.email);

    if (usuario) {
      // Actualiza el usuario con los datos del cuerpo de la solicitud

      await UsuarioModel.update(req.body, {
        where: { Email: req.params.email },
      });
      // Responde con un mensaje de éxito
      res.json({ message: "User updated successfully!" });

    } else {
      // Si el usuario no se encuentra, responde con un mensaje de error
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    // Maneja cualquier error que ocurra y responde con un mensaje de error
    console.log("error");
    res.status(500).json({ message: error.message });
  }
};


// Delete a user
export const deleteUsuario = async (req, res) => {
  try {
    const usuario = await UsuarioModel.findByPk(req.params.email);
    if (usuario) {
      await UsuarioModel.destroy({ where: { Email: req.params.email } });
      res.json({ message: 'User deleted successfully!' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
