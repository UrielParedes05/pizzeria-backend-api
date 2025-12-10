// Configuración de conexión a base de datos
require('dotenv').config();
const { Sequelize } = require("sequelize");

// Comprobamos si existe la URL de conexión completa (preferida en hosting)
const connectionString = process.env.DATABASE_URL;

const sequelize = connectionString
  ? // 1. Usar la Cadena de Conexión (URI) si existe
    new Sequelize(connectionString, {
      dialect: 'postgres',
      logging: false,
      timezone: '-05:00',
      dialectOptions: {
        // Necesario para que el driver sepa cómo manejar el SSL
        ssl: {
          require: true,
          rejectUnauthorized: false, 
        },
      },
    })
  : // 2. Usar las variables separadas (el método que tienes actualmente)
    new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        logging: false,
        timezone: '-05:00',
        dialectOptions: {
          host: process.env.DB_HOST,
          family: 4, // Forzar IPv4
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    );

module.exports = sequelize;