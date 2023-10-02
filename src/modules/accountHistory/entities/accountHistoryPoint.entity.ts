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
  Timestamp,
} from "typeorm"
import { User } from "../../users/entities/user.entity"
import { Transaction } from "../../transaction/entities/transaction.entity"
import { IAccountHistoryPoint } from "../accountHistoryPoint.interface"
import { Account } from "../../account/entities/account.entity"
import { getTimestamptz } from "src/common/helpers/getTimestamptz"

//todo https://stackoverflow.com/questions/19843203/how-to-store-a-datetime-in-mysql-with-timezone-info#:~:text=MySQL%20converts%20TIMESTAMP%20values%20from,local%20time%20to%20begin%20with
//todo https://wanago.io/2021/03/15/postgresql-typeorm-date-time/
@Entity()
export class AccountHistoryPoint
  extends BaseEntity
  implements IAccountHistoryPoint
{
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({
    type: "timestamptz",
    transformer: {
      to: (date: Date) => getTimestamptz(new Date(date)),
      from: (date: string) => new Date(date),
    },
  })
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