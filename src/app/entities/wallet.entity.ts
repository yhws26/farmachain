// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Wallet extends BaseEntity {

  @PrimaryColumn({ length: 100 })
  id: string;

  @Column({ nullable: false })
  balance: number;
}
