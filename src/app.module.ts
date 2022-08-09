import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SerieModule } from './serie/modules/serie.module';
import ormconfig from '../ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), SerieModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
