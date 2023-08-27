import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Trade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: string;

  @Column()
  size: number;

  @Column()
  side: number;

  @Column()
  security: number; // fk

  @Column()
  client: string;
}
