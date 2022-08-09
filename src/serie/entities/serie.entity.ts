import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('serie')
export class Serie {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  titulo: string;

  @Column({
    name: 'data_lancamento',
  })
  dataLancamento: Date;

  @Column()
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
