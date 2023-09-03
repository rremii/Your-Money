import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm"
import { IAccount } from "../account.interface"
import { User } from "../../users/entities/user.entity"
import { Transaction } from "../../transaction/entities/transaction.entity"

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
