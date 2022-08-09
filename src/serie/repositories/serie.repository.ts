import { EntityRepository, Repository } from 'typeorm';
import { Serie } from '../entities/serie.entity';

@EntityRepository(Serie)
export class SerieRepository extends Repository<Serie> {}
