import { Injectable } from '@nestjs/common';
import { SerieRepository } from '../repositories/serie.repository';

@Injectable()
export class SerieService {
  constructor(private readonly serieRepository: SerieRepository) {}
  async get() {
    return this.serieRepository.save({ titulo: 'A Volta dos que não foram' });
  }
}
