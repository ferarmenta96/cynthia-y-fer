import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proceso } from '../entities/proceso.entity';
import { ProcesoDto } from '../dto/proceso.dto';

@Injectable()
export class ProcesoService {
  constructor(@InjectRepository(Proceso) private repo: Repository<Proceso>) {}

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  async create(dto: ProcesoDto) {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: number, dto: ProcesoDto) {
    await this.repo.update({ id }, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.repo.delete({ id });
    return { deleted: true };
  }
}
