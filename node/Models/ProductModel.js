import { DataTypes } from "sequelize";
import db from "../DataBase/db.js";

const ProductModel = db.define('Product', {
  Codigo: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  ProductName: { 
    type: DataTypes.STRING(20), 
    allowNull: false 
  },
  Descripiton1: { 
    type: DataTypes.STRING(50), 
    allowNull: false 
  },
  Descripiton2: { 
    type: DataTypes.STRING(50), 
    allowNull: false 
  },
  CategoryId: { 
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
  DateAdded: { 
    type: DataTypes.DATE, 
    allowNull: false 
  },
	Vendidos: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  ProductImage: { 
    type: DataTypes.BLOB, 
    allowNull: false
  }
}, {
  tableName: 'Product',
  timestamps: false
});

export default ProductModel;
