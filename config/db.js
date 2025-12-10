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
    // === CONFIGURACIÓN CRÍTICA PARA SUPABASE ===
    dialectOptions: {
      host: process.env.DB_HOST,
      // 1. FORZAR IPv4: Soluciona ENETUNREACH
      family: 4, 
      // 2. REQUERIR SSL: Requisito de Supabase para conexiones externas
      ssl: {
        require: true,
        // Permite que la conexión se realice sin un certificado CA si el host lo soporta
        rejectUnauthorized: false 
      }
    }
    // ===========================================
  }
);

module.exports = sequelize;