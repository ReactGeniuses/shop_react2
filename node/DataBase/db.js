import { Sequelize } from 'sequelize';

const db = new Sequelize('Proyecto', 'prueba', '12345678', {
  host: 'LAPTOP-NO632R4G',
  dialect: 'mssql',
  logging: false, // Desactiva el registro de consultas SQL en la consola (opcional)
});

export default db;
