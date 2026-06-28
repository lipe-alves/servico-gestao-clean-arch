import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
class Pagamento {
  @PrimaryColumn()
  codAssinatura: number;

  @PrimaryColumn('date')
  dataPagamento: string;

  @Column('decimal', { precision: 10, scale: 2 })
  valorPago: number;
}

export { Pagamento };
export default Pagamento;
