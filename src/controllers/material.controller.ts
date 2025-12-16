import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MaterialService } from '../services/material.service';
import { MaterialDto } from '../dto/material.dto';

@Controller('materials')
export class MaterialController {
  constructor(private service: MaterialService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  @Post()
  create(@Body() dto: MaterialDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: MaterialDto) {
    return this.service.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
