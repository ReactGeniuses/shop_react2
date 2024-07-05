import { DataTypes } from "sequelize";
import db from "../DataBase/db.js";

const SalesOrdersDetails = db.define('SalesOrdersDetails', {
    ID_Detail: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    ID_Order: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ProductID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    SubTotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  }, {
    tableName: 'SalesOrdersDetails',
    timestamps: false
  });
  
  export default SalesOrdersDetails;