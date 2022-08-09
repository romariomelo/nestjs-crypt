import { Controller, Get } from '@nestjs/common';
import { SerieService } from '../services/serie.service';

@Controller('serie')
export class SerieController {
  constructor(private readonly serieService: SerieService) {}
  @Get()
  async get() {
    return this.serieService.get();
  }
}
