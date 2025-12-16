import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProcesoService } from '../services/proceso.service';
import { ProcesoDto } from '../dto/proceso.dto';

@Controller('procesos')
export class ProcesoController {
  constructor(private service: ProcesoService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  @Post()
  create(@Body() dto: ProcesoDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: ProcesoDto) {
    return this.service.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
