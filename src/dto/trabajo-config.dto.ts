import { IsNumber, IsString, Min } from 'class-validator';

export class TrabajoConfigDto {
  @IsNumber()
  @Min(0)
  ancho!: number;

  @IsNumber()
  @Min(0)
  alto!: number;

  @IsNumber()
  @Min(0)
  espesor!: number;

  @IsString()
  unidadDimension!: string;

  @IsNumber()
  @Min(0)
  tiempoEstimadoMin!: number;

  @IsNumber()
  @Min(0)
  insumos!: number;

  @IsNumber()
  @Min(0)
  desperdicio!: number;

  @IsNumber()
  margen!: number;

  @IsNumber()
  materialId!: number;

  @IsNumber()
  procesoId!: number;
}
