import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Material } from './entities/material.entity';
import { Proceso } from './entities/proceso.entity';
import { TrabajoConfig } from './entities/trabajo-config.entity';
import { MaterialService } from './services/material.service';
import { ProcesoService } from './services/proceso.service';
import { TrabajoConfigService } from './services/trabajo-config.service';
import { PricingService } from './services/pricing.service';
import { DomainValidationService } from './services/domain-validation.service';
import { MaterialController } from './controllers/material.controller';
import { ProcesoController } from './controllers/proceso.controller';
import { TrabajoConfigController } from './controllers/trabajo-config.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Material, Proceso, TrabajoConfig],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Material, Proceso, TrabajoConfig]),
  ],
  controllers: [MaterialController, ProcesoController, TrabajoConfigController],
  providers: [
    MaterialService,
    ProcesoService,
    TrabajoConfigService,
    PricingService,
    DomainValidationService,
  ],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();
