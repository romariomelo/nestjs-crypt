import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  DateEncryptionTransformer,
  AppEncryptionTransformer,
  NumberEncryptionTransformer,
} from '../../utils/transformers';

@Entity('serie')
export class Serie {
  // Transformer adequado para cada tipo de dado
  // e com configuração centralizada
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'titulo',
    type: 'varchar',
    transformer: new AppEncryptionTransformer(), // Transformer adequado para cada tipo de dado
  })
  titulo: string;

  @Column({
    name: 'data_lancamento',
    type: 'varchar',
    transformer: new DateEncryptionTransformer(), // Transformer exclusivo para Date
  })
  dataLancamento: Date;

  @Column({
    name: 'temporadas',
    type: 'varchar',
    transformer: new NumberEncryptionTransformer(), // Transformer exclusivo para number
  })
  temporadas: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
