import { DataTypes } from "sequelize";
import db from "../DataBase/db.js";

const DireccionModel = db.define('Direccion', {
  DireccionId: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  Email: { 
    type: DataTypes.STRING(50), 
    allowNull: false,
    onDelete: 'CASCADE'
  },
  NombreDireccion: { 
    type: DataTypes.STRING(50), 
    allowNull: false 
  },
  Pais: { 
    type: DataTypes.STRING(50), 
    allowNull: false 
  },
  Provincia: { 
    type: DataTypes.STRING(50), 
    allowNull: false 
  },
  DireccionDescripcion: { 
    type: DataTypes.STRING(100), 
    allowNull: false 
  }
}, {
  tableName: 'Direccion',
  timestamps: false
});

export default DireccionModel;
