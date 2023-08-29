import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm"
import { IAccount, ITransaction, TransactionType } from "../account.interface"
import { Account } from "./account.entity"

@Entity()
export class Transaction extends BaseEntity implements ITransaction {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  category: string

  @CreateDateColumn()
  date: Date

  @Column()
  quantity: number

  @Column()
  type: TransactionType

  @Column()
  accountBalance: number

  @Column({ nullable: true })
  title?: string

  @Column()
  accountId: number

  @ManyToOne(() => Account, (account) => account.transactions)
  @JoinColumn({ name: "accountId" })
  account: Account
}
