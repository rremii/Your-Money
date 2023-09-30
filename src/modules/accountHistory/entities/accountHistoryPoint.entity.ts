import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm"
import { User } from "../../users/entities/user.entity"
import { Transaction } from "../../transaction/entities/transaction.entity"
import { IAccountHistoryPoint } from "../accountHistoryPoint.interface"
import { Account } from "../../account/entities/account.entity"

@Entity()
export class AccountHistoryPoint
  extends BaseEntity
  implements IAccountHistoryPoint
{
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  date: Date

  @Column({ default: 0 })
  balance: number

  @Column()
  accountId: number

  @ManyToOne(() => User, (user) => user.accounts)
  user: User

  @OneToOne(() => Transaction, (transaction) => transaction.accountHistoryPoint)
  transaction: Transaction

  @ManyToOne(() => Account, (account) => account.accountHistoryPoints)
  @JoinColumn({ name: "accountId" })
  account: Account
}
