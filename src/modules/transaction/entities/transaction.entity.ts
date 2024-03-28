import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm"
import { Account } from "../../account/entities/account.entity"
import { ITransaction, TransactionType } from "../transaction.interface"
import { Category } from "../../category/entities/category.entity"
import { AccountHistoryPoint } from "../../accountHistory/entities/accountHistoryPoint.entity"

@Entity()
export class Transaction extends BaseEntity implements ITransaction {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: "timestamptz",
  })
  date: string

  @Column({ type: "float" })
  quantity: number

  @Column()
  type: TransactionType

  @Column({ nullable: true })
  title?: string

  @Column()
  accountId: number

  @Column()
  categoryId: number

  @ManyToOne(() => Account, (account) => account.transactions)
  @JoinColumn({ name: "accountId" })
  account: Account

  @ManyToOne(() => Category, (category) => category.transactions)
  @JoinColumn({ name: "categoryId" })
  category: Category

  // @ManyToOne(() => User, (user) => user.transaction)
  // user: User

  @OneToOne(
    () => AccountHistoryPoint,
    (AccountHistoryPoint) => AccountHistoryPoint.transaction,
  )
  @JoinColumn()
  accountHistoryPoint: AccountHistoryPoint
}
