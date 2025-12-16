import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Material } from '../entities/material.entity';
import { Proceso } from '../entities/proceso.entity';

const dataSource = new DataSource({
  type: 'sqlite',
  database: 'db.sqlite',
  entities: [Material, Proceso],
  synchronize: true,
});

async function seed() {
  await dataSource.initialize();
  const materialRepo = dataSource.getRepository(Material);
  const procesoRepo = dataSource.getRepository(Proceso);

  const materiales = [
    { nombre: 'Acero', costoUnidad: 25, espesorMin: 1, espesorMax: 20, unidadEspesor: 'mm' },
    { nombre: 'Aluminio', costoUnidad: 18, espesorMin: 0.5, espesorMax: 15, unidadEspesor: 'mm' },
    { nombre: 'MDF', costoUnidad: 12, espesorMin: 3, espesorMax: 30, unidadEspesor: 'mm' },
  ];

  const procesos = [
    { nombre: 'Láser', costoMaquinaMin: 3.5, desperdicioPorcentaje: 0.05 },
    { nombre: 'Corte plasma', costoMaquinaMin: 2.8, desperdicioPorcentaje: 0.08 },
    { nombre: 'Router CNC', costoMaquinaMin: 2.2, desperdicioPorcentaje: 0.03 },
  ];

  await materialRepo.save(materiales);
  await procesoRepo.save(procesos);
  await dataSource.destroy();
}

seed();
