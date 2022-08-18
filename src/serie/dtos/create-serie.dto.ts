import { IsDateString, IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateSerieDto {
  // Como os dados criptografados são caracteres, os tipos dos atributos devem
  // ser tratados como string, independetemente do formato original. Sendo necessário
  // converter para o formato correto.

  @IsNotEmpty({ message: 'titulo é obrigatório' })
  titulo: string;

  @IsNotEmpty({ message: 'dataLancamento é obrigatório' })
  @IsDateString()
  dataLancamento: string; // Date

  @IsNumberString(
    { maxDecimalPlaces: 0 },
    { message: 'temporadas deve ser um numero válido' },
  )
  temporadas: string; // number
}
