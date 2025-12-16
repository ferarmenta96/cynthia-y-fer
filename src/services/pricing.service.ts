import { Injectable } from '@nestjs/common';
import { Proceso } from '../entities/proceso.entity';
import { TrabajoConfigDto } from '../dto/trabajo-config.dto';

@Injectable()
export class PricingService {
  calcularCosto(dto: TrabajoConfigDto, proceso: Proceso): number {
    const desperdicioFactor = 1 + proceso.desperdicioPorcentaje;
    const base =
      dto.tiempoEstimadoMin * proceso.costoMaquinaMin + dto.insumos + dto.desperdicio * desperdicioFactor;
    return base * (1 + dto.margen);
  }
}
