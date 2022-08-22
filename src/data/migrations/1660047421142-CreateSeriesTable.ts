import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSeriesTable1660047421142 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'serie',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'titulo',
            type: 'varchar',
          },
          {
            name: 'data_lancamento',
            type: 'varchar', // Campo criptografados deve ser tipado como texto
          },
          {
            name: 'temporadas',
            type: 'varchar', // Campo criptografados deve ser tipado como texto
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'current_timestamp',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'current_timestamp',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('serie');
  }
}
