import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
// import { Security } from '../security/security.entity';

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
