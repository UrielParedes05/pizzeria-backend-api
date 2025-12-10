// Configuración de conexión a base de datos
require('dotenv').config();
const { Sequelize } = require("sequelize");
const fs = require('fs'); // <-- ¡NUEVO: Importar 'fs'!
const path = require('path'); // <-- ¡NUEVO: Importar 'path' para rutas!

// Intentamos usar la URL completa (más robusto)
const connectionString = process.env.DATABASE_URL;

// --- OPCIONES DE SSL/CERTIFICADO ---
// Asegúrate de que el archivo ca.pem esté en ./config/ca.pem
const caCertPath = path.join(__dirname, 'ca.pem'); 
const sslConfig = {
  require: true,
  // Le dice al driver que CONFÍE en el certificado que vamos a proporcionar
  rejectUnauthorized: true, 
  // Lee el contenido del certificado PEM
  ca: fs.readFileSync(caCertPath).toString(), 
};
// ------------------------------------

const sequelize = connectionString
  ? // 1. Usar la Cadena de Conexión (URI)
    new Sequelize(connectionString, {
      dialect: 'postgres',
      logging: false,
      timezone: '-05:00',
      dialectOptions: {
        ssl: sslConfig, // <-- USAR LA CONFIGURACIÓN SSL COMPLETA
      },
    })
  : // 2. Usar las variables separadas
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
          ssl: sslConfig, // <-- USAR LA CONFIGURACIÓN SSL COMPLETA
        },
      }
    );

module.exports = sequelize;