import { Module } from '@nestjs/common';
import { mySqlDatabaseProvider } from 'src/config/database';

@Module({
  providers: [...mySqlDatabaseProvider],
  exports: [...mySqlDatabaseProvider],
})
export class DatabaseModule {}
