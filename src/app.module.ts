
import { Module } from '@nestjs/common';
import { ConfigModuleOptions, DatabaseModule } from 'src/config/module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModuleOptions,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
