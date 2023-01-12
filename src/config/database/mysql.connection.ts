import { DataSource } from 'typeorm';

import * as mySqlConnectionOptions from '../../../ormconfig.js';

export const mySqlConnection = new DataSource(mySqlConnectionOptions);
