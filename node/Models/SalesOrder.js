import { DataTypes } from "sequelize";
import db from "../DataBase/db.js";

const SalesOrder = db.define('SalesOrder', {
    ID_Order: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    EmailUser: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Nombre: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Direccion: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    OrderDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    StateOrder: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    Total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    }
  }, {
    tableName: 'SalesOrder',
    timestamps: false
  });
  
  export default SalesOrder;