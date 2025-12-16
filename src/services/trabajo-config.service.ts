import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrabajoConfig } from '../entities/trabajo-config.entity';
import { Material } from '../entities/material.entity';
import { Proceso } from '../entities/proceso.entity';
import { TrabajoConfigDto } from '../dto/trabajo-config.dto';
import { PricingService } from './pricing.service';
import { DomainValidationService } from './domain-validation.service';

@Injectable()
export class TrabajoConfigService {
  constructor(
    @InjectRepository(TrabajoConfig) private repo: Repository<TrabajoConfig>,
    @InjectRepository(Material) private materialRepo: Repository<Material>,
    @InjectRepository(Proceso) private procesoRepo: Repository<Proceso>,
    private pricing: PricingService,
    private domainValidation: DomainValidationService,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['material', 'proceso'] });
  }

  async findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['material', 'proceso'] });
  }

  async create(dto: TrabajoConfigDto) {
    const material = await this.materialRepo.findOneBy({ id: dto.materialId });
    const proceso = await this.procesoRepo.findOneBy({ id: dto.procesoId });
    if (!material || !proceso) {
      throw new Error('Material o proceso no encontrado');
    }
    this.domainValidation.validarEspesor(material, dto.espesor);
    this.domainValidation.validarDimensiones(dto);
    const costoCalculado = this.pricing.calcularCosto(dto, proceso);
    const entity = this.repo.create({
      ...dto,
      material,
      proceso,
      costoCalculado,
    });
    return this.repo.save(entity);
  }

  async update(id: number, dto: TrabajoConfigDto) {
    const existing = await this.findOne(id);
    if (!existing) throw new Error('Trabajo no encontrado');
    const material = await this.materialRepo.findOneBy({ id: dto.materialId });
    const proceso = await this.procesoRepo.findOneBy({ id: dto.procesoId });
    if (!material || !proceso) {
      throw new Error('Material o proceso no encontrado');
    }
    this.domainValidation.validarEspesor(material, dto.espesor);
    this.domainValidation.validarDimensiones(dto);
    const costoCalculado = this.pricing.calcularCosto(dto, proceso);
    await this.repo.update(
      { id },
      { ...dto, material, proceso, costoCalculado },
    );
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.repo.delete({ id });
    return { deleted: true };
  }
}
