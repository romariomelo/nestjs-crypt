import { Injectable } from '@nestjs/common';
import { CreateSerieDto } from '../dtos/create-serie.dto';
import { SerieRepository } from '../repositories/serie.repository';

@Injectable()
export class SerieService {
  constructor(private readonly serieRepository: SerieRepository) {}

  async get() {
    return this.serieRepository.find();
  }

  async create(createSerieDto: CreateSerieDto) {
    return this.serieRepository.save(createSerieDto);
  }
}
