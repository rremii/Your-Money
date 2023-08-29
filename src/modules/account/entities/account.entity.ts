import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm"
import { IAccount } from "../account.interface"
import { Transaction } from "./transaction.entity"
import { User } from "../../users/entities/user.entity"

// @Unique(["email"])
@Entity()
export class Account extends BaseEntity implements IAccount {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  color: string

  @Column({ default: 0 })
  balance: number

  @Column()
  icon: string

  @ManyToOne(() => User, (user) => user.accounts)
  user: User

  @OneToMany(() => Transaction, (transaction) => transaction.account)
  transactions: Transaction[]
}
