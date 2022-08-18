import { EntityRepository, Repository } from 'typeorm';
import { CreateSerieDto } from '../dtos/create-serie.dto';
import { Serie } from '../entities/serie.entity';

@EntityRepository(Serie)
export class SerieRepository extends Repository<Serie> {
  // Para utilizar a criptografia no PostgreSQL sempre que houver consulta com
  // dados criptografados é necessário usar o createQueryBuilder to typeorm

  // Para a criptografia feita no PostgreSQL, todo atributo que for criptografada
  // deve ser envolvida pela função encrypt do PostgreSQL para ser inserida.
  async saveSerie(createSerieDto: CreateSerieDto) {
    return this.createQueryBuilder()
      .insert()
      .into(Serie)
      .values({
        titulo: () =>
          `encode(encrypt('${createSerieDto.titulo}','${process.env.ENCRYPTION_KEY}','aes'), 'hex')`,
        dataLancamento: () =>
          `encode(encrypt('${createSerieDto.dataLancamento}','${process.env.ENCRYPTION_KEY}','aes'), 'hex')`,
        temporadas: () =>
          `encode(encrypt('${createSerieDto.temporadas}','${process.env.ENCRYPTION_KEY}','aes'), 'hex')`,
      })
      .execute();
  }

  // Ao buscar a informação no PostgreSQL todas as colunas que forem criptografadas
  // devem ser envolvida na função decrypt chamando a função addSelect
  async findSerie() {
    return this.createQueryBuilder('serie')
      .select(
        `convert_from(decrypt(concat('\\x', titulo)::bytea, '${process.env.ENCRYPTION_KEY}', 'aes'), 'UTF-8') as titulo`,
      )
      .addSelect(
        `convert_from(decrypt(concat('\\x', data_lancamento)::bytea, '${process.env.ENCRYPTION_KEY}', 'aes'), 'UTF-8') as data_lancamento`,
      )
      .addSelect(
        `convert_from(decrypt(concat('\\x', data_lancamento)::bytea, '${process.env.ENCRYPTION_KEY}', 'aes'), 'UTF-8') as data_lancamento`,
      )
      .getRawMany();
  }
}
