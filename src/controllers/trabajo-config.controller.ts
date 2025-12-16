import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TrabajoConfigService } from '../services/trabajo-config.service';
import { TrabajoConfigDto } from '../dto/trabajo-config.dto';

@Controller('trabajos')
export class TrabajoConfigController {
  constructor(private service: TrabajoConfigService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  @Post()
  create(@Body() dto: TrabajoConfigDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: TrabajoConfigDto) {
    return this.service.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
