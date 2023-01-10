require('dotenv').config();

module.exports = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migration/*.{js,ts}'],
  seeds: ['dist/seeds/*.seed.{ts,js}'],
  cli: {
    migrationsDir: 'migration',
  },
};
