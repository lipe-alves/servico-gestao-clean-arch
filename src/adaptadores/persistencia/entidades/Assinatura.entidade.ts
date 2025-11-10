import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Plano from './Plano.entidade';
import Cliente from './Cliente.entidade';

enum AssinaturaStatus {
  CANCELADO = 'Cancelado',
  ATIVO = 'Ativo',
}

@Entity()
class Assinatura {
  @PrimaryGeneratedColumn()
  codigo: number;

  @Column()
  codCliente: number;

  @ManyToOne(() => Cliente)
  @JoinColumn({ name: 'codCliente' })
  cliente: Cliente;

  @Column()
  codPlano: number;

  @ManyToOne(() => Plano)
  @JoinColumn({ name: 'codPlano' })
  plano: Plano;

  @Column({
    type: 'enum',
    enum: AssinaturaStatus,
    default: AssinaturaStatus.ATIVO
  })
  status: AssinaturaStatus;

  @Column('datetime')
  inicioFidelidade: Date;

  @Column('datetime')
  fimFidelidade: Date;

  @Column('datetime', { nullable: true })
  dataUltimoPagamento?: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  custoFinal: number;

  @Column({ type: 'text' })
  descricao: string;
}

export { Assinatura, AssinaturaStatus };
export default Assinatura;
