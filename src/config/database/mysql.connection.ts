import { DataSource } from "typeorm";

import * as mySqlConnectionOptions from '../../../ormconfig.js';
console.log(mySqlConnectionOptions.entities);

export const mySqlConnection = new DataSource(mySqlConnectionOptions);