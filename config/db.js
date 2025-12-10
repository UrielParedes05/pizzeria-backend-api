// Configuración de conexión a base de datos
require('dotenv').config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
    timezone: '-05:00',
    // === SOLUCIÓN: FORZAR IPv4 ===
    dialectOptions: {
      host: process.env.DB_HOST,
      ssl: false, // Desactiva SSL por si acaso (Supabase no lo requiere por defecto)
      // La opción más importante: le dice al driver 'pg' que solo use IPv4
      family: 4, 
    },
    // =============================
  }
);

module.exports = sequelize;