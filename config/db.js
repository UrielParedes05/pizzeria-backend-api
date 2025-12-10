// Configuración de conexión a base de datos
require('dotenv').config();
const { Sequelize } = require("sequelize");

// === SOLUCIÓN AGRESIVA PARA ENETUNREACH EN ENTORNO DE HOSTING ===
// Esto forza al driver 'pg' a ignorar IPv6, resolviendo el problema de red.
// (Esto debe ir ANTES de cualquier conexión a la base de datos)
try {
  const pg = require('pg');
  pg.defaults.preferIPv6 = false;
  console.log("✅ Configuración de pg: IPv4 preferido.");
} catch (e) {
  // Ignorar si 'pg' no está instalado (aunque debería estarlo)
}
// ================================================================

// Usamos la URI completa (si existe) para la conexión, ya que es la más robusta
const connectionString = process.env.DATABASE_URL;

const sequelize = connectionString
  ? // 1. Usar la Cadena de Conexión (URI) si existe
    new Sequelize(connectionString, {
      dialect: 'postgres',
      logging: false,
      timezone: '-05:00',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // Usar 'false' para máxima compatibilidad
        },
      },
    })
  : // 2. Usar las variables separadas (con forzado de family: 4 si fuera necesario)
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
          family: 4, 
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    );

module.exports = sequelize;