import { DataSource, DataSourceOptions } from 'typeorm';

import configuration from '../configuration';
const ormOption = configuration().database;

const dataSourceOptions = {
  ...ormOption,
  synchronize: false,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migration/*.{js,ts}'],
  seeds: ['dist/seeds/*.seed.{ts,js}'],
  cli: {
    migrationsDir: 'migration',
  },
} as DataSourceOptions;

export const mySqlConnection = new DataSource({ ...dataSourceOptions });
