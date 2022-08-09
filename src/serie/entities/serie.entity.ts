import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('serie')
export class Serie {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  titulo: string;
}
