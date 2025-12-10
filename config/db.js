// Configuración de conexión a base de datos
require('dotenv').config();
const { Sequelize } = require("sequelize");

// Requerimos el módulo 'pg' para la conexión
const connectionString = process.env.DATABASE_URL;

// Configuración SSL (esencial para Neon, similar a Supabase)
const sslConfig = {
  require: true,
  rejectUnauthorized: false, // Usamos 'false' para máxima compatibilidad
};

const sequelize = new Sequelize(connectionString, {
  dialect: 'postgres',
  logging: false,
  timezone: '-05:00',
  dialectOptions: {
    ssl: sslConfig,
  },
});

module.exports = sequelize;