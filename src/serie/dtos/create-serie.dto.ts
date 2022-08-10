import { IsDateString, IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateSerieDto {
  @IsNotEmpty({ message: 'titulo é obrigatório' })
  titulo: string;

  @IsNotEmpty({ message: 'dataLancamento é obrigatório' })
  @IsDateString()
  dataLancamento: string;

  @IsNumberString(
    { maxDecimalPlaces: 0 },
    { message: 'temporadas deve ser um numero válido' },
  )
  temporadas: string;
}
