import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SerieController } from '../controllers/serie.controller';
import { SerieRepository } from '../repositories/serie.repository';
import { SerieService } from '../services/serie.service';

@Module({
  imports: [TypeOrmModule.forFeature([SerieRepository])],
  controllers: [SerieController],
  providers: [SerieService],
})
export class SerieModule {}
