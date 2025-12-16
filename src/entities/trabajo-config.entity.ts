import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Material } from './material.entity';
import { Proceso } from './proceso.entity';

@Entity({ name: 'trabajos_config' })
export class TrabajoConfig {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('float')
  ancho!: number;

  @Column('float')
  alto!: number;

  @Column('float')
  espesor!: number;

  @Column({ default: 'mm' })
  unidadDimension!: string;

  @Column('float')
  tiempoEstimadoMin!: number;

  @Column('float')
  insumos!: number;

  @Column('float')
  desperdicio!: number;

  @Column('float', { default: 0.15 })
  margen!: number;

  @ManyToOne(() => Material, { eager: true })
  @JoinColumn({ name: 'material_id' })
  material!: Material;

  @ManyToOne(() => Proceso, { eager: true })
  @JoinColumn({ name: 'proceso_id' })
  proceso!: Proceso;

  @Column('float')
  costoCalculado!: number;
}
