import { DataTypes } from 'sequelize';
import db from '../DataBase/db.js';

const UsuarioModel = db.define('Usuario', {
  Email: { 
    type: DataTypes.STRING(50), 
    primaryKey: true, 
    allowNull: false,
  },
  Nombre: { 
    type: DataTypes.STRING(50), 
    allowNull: false 
  }
}, {
  tableName: 'Usuario',
  timestamps: false
});

export default UsuarioModel;
