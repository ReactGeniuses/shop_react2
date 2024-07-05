import { DataTypes } from "sequelize";
import db from "../DataBase/db.js";

const WishlistModel = db.define('Wishlist', {
  WishID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  EmailUser: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  ProductID: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'Wishlist',
  timestamps: false
});

export default WishlistModel;
