import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSerieDto {
  @IsNotEmpty({ message: 'titulo é obrigatório' })
  titulo: string;

  @IsNotEmpty({ message: 'dataLancamento é obrigatório' })
  dataLancamento: Date;

  @IsNumber(
    { maxDecimalPlaces: 0 },
    { message: 'temporadas deve ser um numero válido' },
  )
  temporadas: number;
}
