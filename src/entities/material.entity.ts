import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'materials' })
export class Material {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  nombre!: string;

  @Column('float')
  costoUnidad!: number;

  @Column('float')
  espesorMin!: number;

  @Column('float')
  espesorMax!: number;

  @Column({ default: 'mm' })
  unidadEspesor!: string;
}
