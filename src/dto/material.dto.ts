import { IsNumber, IsString, Min } from 'class-validator';

export class MaterialDto {
  @IsString()
  nombre!: string;

  @IsNumber()
  @Min(0)
  costoUnidad!: number;

  @IsNumber()
  espesorMin!: number;

  @IsNumber()
  espesorMax!: number;

  @IsString()
  unidadEspesor!: string;
}
