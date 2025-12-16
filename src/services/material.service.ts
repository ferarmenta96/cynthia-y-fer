import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Material } from '../entities/material.entity';
import { MaterialDto } from '../dto/material.dto';

@Injectable()
export class MaterialService {
  constructor(@InjectRepository(Material) private repo: Repository<Material>) {}

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  async create(dto: MaterialDto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: number, dto: MaterialDto) {
    await this.repo.update({ id }, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.repo.delete({ id });
    return { deleted: true };
  }
}
