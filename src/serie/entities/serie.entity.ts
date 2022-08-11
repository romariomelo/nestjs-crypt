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
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'titulo',
    type: 'varchar',
    transformer: new AppEncryptionTransformer(),
  })
  titulo: string;

  @Column({
    name: 'data_lancamento',
    type: 'varchar',
    transformer: new DateEncryptionTransformer(),
  })
  dataLancamento: Date;

  @Column({
    name: 'temporadas',
    type: 'varchar',
    transformer: new NumberEncryptionTransformer(),
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
