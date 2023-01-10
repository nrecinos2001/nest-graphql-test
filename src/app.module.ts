import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/config/configuration';
import { ConfigModuleOptions } from 'src/config/module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModuleOptions],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
