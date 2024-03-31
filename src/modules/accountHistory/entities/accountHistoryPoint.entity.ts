import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm"
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

  @CreateDateColumn({
    type: "timestamptz",
  })
  date: string

  @Column({ default: 0, type: "float" })
  balance: number

  @Column()
  accountId: number


  @OneToOne(() => Transaction, (transaction) => transaction.accountHistoryPoint)
  transaction: Transaction

  @ManyToOne(() => Account, (account) => account.accountHistoryPoints)
  @JoinColumn({ name: "accountId" })
  account: Account
}
