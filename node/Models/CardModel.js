import { DataTypes } from "sequelize";
import db from "../DataBase/db.js";

const CardModel = db.define('Tarjeta', {
  TarjetaId: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  Email: { 
    type: DataTypes.STRING(50), 
    allowNull: false,
    onDelete: 'CASCADE'
  },
  TipoTarjeta: { 
    type: DataTypes.STRING(20), 
    allowNull: false 
  },
  NombreTitular: { 
    type: DataTypes.STRING(50), 
    allowNull: false 
  },
  NumeroTarjeta: { 
    type: DataTypes.CHAR(16), 
    allowNull: false 
  },
  UltimosTresNumeros: { 
    type: DataTypes.CHAR(3), 
    allowNull: false 
  }
}, {
  tableName: 'Tarjeta',
  timestamps: false
});

export default CardModel;