import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
class Plano {
  @PrimaryGeneratedColumn()
  codigo: number;

  @Column({ type: 'varchar', length: 360 })
  nome: string;

  @Column('decimal', { precision: 10, scale: 2 })
  custoMensal: number;

  @Column('datetime')
  data: Date;

  @Column({ type: 'text' })
  descricao: string;
}

export { Plano };
export default Plano;
