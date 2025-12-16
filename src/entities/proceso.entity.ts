import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'procesos' })
export class Proceso {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  nombre!: string;

  @Column('float')
  costoMaquinaMin!: number;

  @Column('float', { default: 0 })
  desperdicioPorcentaje!: number;
}
