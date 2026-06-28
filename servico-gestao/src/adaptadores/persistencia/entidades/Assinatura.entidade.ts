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
  Cancelado = 'Cancelado',
  Ativo = 'Ativo',
  Vencido = 'Vencido',
  Pendente = 'Pendente',
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

  @Column('decimal', { precision: 2, scale: 0 })
  diaVencimento: number;

  @Column('date')
  inicioFidelidade: string;

  @Column('date')
  fimFidelidade: string;

  @Column('date', { nullable: true })
  dataUltimoPagamento?: string;

  @Column('decimal', { precision: 10, scale: 2 })
  custoFinal: number;

  @Column({ type: 'text' })
  descricao: string;
}

export { Assinatura, AssinaturaStatus };
export default Assinatura;
