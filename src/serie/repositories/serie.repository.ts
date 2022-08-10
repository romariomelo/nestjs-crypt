import { EntityRepository, Repository } from 'typeorm';
import { CreateSerieDto } from '../dtos/create-serie.dto';
import { Serie } from '../entities/serie.entity';

@EntityRepository(Serie)
export class SerieRepository extends Repository<Serie> {
  async saveSerie(createSerieDto: CreateSerieDto) {
    return this.createQueryBuilder()
      .insert()
      .into(Serie)
      .values({
        titulo: () => this.encryptionRaw(createSerieDto.titulo),
        dataLancamento: () => this.encryptionRaw(createSerieDto.dataLancamento),
        temporadas: () => this.encryptionRaw(createSerieDto.temporadas),
      })
      .execute();
  }

  async findSerie() {
    return this.createQueryBuilder('serie')
      .select(this.decryptRaw('titulo'))
      .addSelect(this.decryptRaw('data_lancamento'))
      .addSelect(this.decryptRaw('temporadas'))
      .getRawMany();
  }

  encryptionRaw(data): string {
    return `encode(encrypt('${data}','${process.env.ENCRYPTION_KEY}','aes'), 'hex')`;
  }

  decryptRaw(campo: string): string {
    return `convert_from(decrypt(concat('\\x', ${campo})::bytea, '${process.env.ENCRYPTION_KEY}', 'aes'), 'UTF-8') as ${campo}`;
  }
}
