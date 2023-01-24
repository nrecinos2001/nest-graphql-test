import { FactoryProvider } from '@nestjs/common';

import { mySqlConnection } from '@Config/database';

export const mySqlDatabaseProvider: FactoryProvider[] = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const mySqlDataSource = mySqlConnection;
      return await mySqlDataSource.initialize();
    },
  },
];
