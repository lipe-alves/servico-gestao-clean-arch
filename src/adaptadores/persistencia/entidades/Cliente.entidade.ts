import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
class Cliente {
  @PrimaryGeneratedColumn()
  codigo: number;

  @Column({ type: "varchar", length: 360 })
  nome: string;

  @Column({ type: "varchar", length: 360 })
  email: string;
}

export { Cliente };
export default Cliente;