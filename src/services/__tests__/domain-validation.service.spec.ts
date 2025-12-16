import { DomainValidationService } from '../domain-validation.service';
import { Material } from '../../entities/material.entity';
import { TrabajoConfigDto } from '../../dto/trabajo-config.dto';

const material: Material = {
  id: 1,
  nombre: 'Acero',
  costoUnidad: 10,
  espesorMin: 1,
  espesorMax: 10,
  unidadEspesor: 'mm',
} as Material;

describe('DomainValidationService', () => {
  const service = new DomainValidationService();

  it('permite espesores dentro de rango', () => {
    expect(() => service.validarEspesor(material, 5)).not.toThrow();
  });

  it('rechaza espesores fuera de rango', () => {
    expect(() => service.validarEspesor(material, 11)).toThrow();
  });

  it('valida dimensiones positivas y dentro de límite', () => {
    const dto: TrabajoConfigDto = {
      ancho: 500,
      alto: 400,
      espesor: 5,
      unidadDimension: 'mm',
      tiempoEstimadoMin: 2,
      insumos: 0,
      desperdicio: 0,
      margen: 0.1,
      materialId: 1,
      procesoId: 1,
    };
    expect(() => service.validarDimensiones(dto)).not.toThrow();
  });

  it('rechaza dimensiones inválidas', () => {
    const dto: TrabajoConfigDto = {
      ancho: 0,
      alto: 4000,
      espesor: 5,
      unidadDimension: 'mm',
      tiempoEstimadoMin: 2,
      insumos: 0,
      desperdicio: 0,
      margen: 0.1,
      materialId: 1,
      procesoId: 1,
    };
    expect(() => service.validarDimensiones(dto)).toThrow();
  });
});
