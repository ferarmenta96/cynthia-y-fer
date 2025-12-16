import { PricingService } from '../pricing.service';
import { Proceso } from '../../entities/proceso.entity';
import { TrabajoConfigDto } from '../../dto/trabajo-config.dto';

describe('PricingService', () => {
  it('calcula costo con margen y desperdicio', () => {
    const service = new PricingService();
    const proceso: Proceso = {
      id: 1,
      nombre: 'Laser',
      costoMaquinaMin: 2,
      desperdicioPorcentaje: 0.1,
    } as Proceso;
    const dto: TrabajoConfigDto = {
      ancho: 100,
      alto: 100,
      espesor: 5,
      unidadDimension: 'mm',
      tiempoEstimadoMin: 10,
      insumos: 50,
      desperdicio: 20,
      margen: 0.2,
      materialId: 1,
      procesoId: 1,
    };

    const costo = service.calcularCosto(dto, proceso);
    const base = 10 * 2 + 50 + 20 * 1.1;
    expect(costo).toBeCloseTo(base * 1.2);
  });
});
