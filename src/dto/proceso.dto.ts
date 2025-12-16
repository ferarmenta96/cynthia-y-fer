import { IsNumber, IsString, Min } from 'class-validator';

export class ProcesoDto {
  @IsString()
  nombre!: string;

  @IsNumber()
  @Min(0)
  costoMaquinaMin!: number;

  @IsNumber()
  @Min(0)
  desperdicioPorcentaje!: number;
}
