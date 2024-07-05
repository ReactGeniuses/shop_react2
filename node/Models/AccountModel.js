import { DataTypes } from 'sequelize';
import db from '../DataBase/db.js';

const AccountModel = db.define('Account', {
  Email: { 
    type: DataTypes.STRING(50), 
    primaryKey: true, 
    allowNull: false 
  },
  AccountPassword: { 
    type: DataTypes.STRING(50), 
    allowNull: false 
  },
  AccountRole: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  }
}, {
  tableName: 'Account',
  timestamps: false
});

export default AccountModel;
