import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateSerieDto } from '../dtos/create-serie.dto';
import { SerieService } from '../services/serie.service';

@Controller('serie')
export class SerieController {
  constructor(private readonly serieService: SerieService) {}

  @Get()
  async get() {
    return this.serieService.get();
  }

  @Post()
  async create(@Body() createSerieDto: CreateSerieDto) {
    return this.serieService.create(createSerieDto);
  }
}
