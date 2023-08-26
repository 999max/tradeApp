import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Trade } from '../trade/trade.entity';

@Entity()
export class Security {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  seccode: string;

  @Column()
  price: string;

  @Column()
  isin: string;

  @Column()
  lotsize: number;
}
