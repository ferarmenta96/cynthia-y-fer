import { Injectable, BadRequestException } from '@nestjs/common';
import { Material } from '../entities/material.entity';
import { TrabajoConfigDto } from '../dto/trabajo-config.dto';

@Injectable()
export class DomainValidationService {
  validarEspesor(material: Material, espesor: number): void {
    if (espesor < material.espesorMin || espesor > material.espesorMax) {
      throw new BadRequestException(
        `El espesor ${espesor}${material.unidadEspesor} no es compatible con ${material.nombre}`,
      );
    }
  }

  validarDimensiones(dto: TrabajoConfigDto): void {
    const limites = { ancho: 3000, alto: 3000, espesor: 300 };
    if (dto.ancho <= 0 || dto.alto <= 0) {
      throw new BadRequestException('Las dimensiones deben ser mayores a cero');
    }
    if (dto.ancho > limites.ancho || dto.alto > limites.alto || dto.espesor > limites.espesor) {
      throw new BadRequestException('Dimensiones exceden los límites permitidos');
    }
  }
}
