import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSerieDto {
  @IsNotEmpty({ message: 'titulo é obrigatório' })
  @IsString()
  titulo: string;
}
