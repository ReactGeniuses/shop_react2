import { DataTypes } from "sequelize";
import db from "../DataBase/db.js";

const CategoryModel = db.define('Category', {
  Id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  CategoryName: { 
    type: DataTypes.STRING(15), 
    allowNull: false 
  }
}, {
  tableName: 'Category',
  timestamps: false
});

export default CategoryModel;
