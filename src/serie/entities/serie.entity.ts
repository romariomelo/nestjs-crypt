import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EncryptionTransformer } from 'typeorm-encrypted';

const MyEncryptionConfig = {
  ivLength: 16,
  key: 'e41c966f21f9e1577802463f8924e6a3fe3e9751f201304213b2f845d8841d61',
  algorithm: 'aes-256-cbc',
};

@Entity('serie')
export class Serie {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'titulo',
    type: 'varchar',
    transformer: new EncryptionTransformer(MyEncryptionConfig),
  })
  titulo: string;

  @Column({
    name: 'data_lancamento',
    type: 'varchar',
    transformer: new EncryptionTransformer(MyEncryptionConfig),
  })
  dataLancamento: string;

  @Column({
    name: 'temporadas',
    type: 'varchar',
    transformer: new EncryptionTransformer(MyEncryptionConfig),
  })
  temporadas: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
