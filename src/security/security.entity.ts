import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
