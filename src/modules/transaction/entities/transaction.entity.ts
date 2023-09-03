import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm"
import { Account } from "../../account/entities/account.entity"
import { ITransaction, TransactionType } from "../transaction.interface"
import { Category } from "../../category/entities/category.entity"
import { User } from "../../users/entities/user.entity"

@Entity()
export class Transaction extends BaseEntity implements ITransaction {
  @PrimaryGeneratedColumn()
  id: number

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

  // @Column()
  // categoryIcon: string

  @Column()
  accountId: number

  @Column()
  categoryId: number

  @Column()
  userId: number

  @ManyToOne(() => Account, (account) => account.transactions)
  @JoinColumn({ name: "accountId" })
  account: Account

  @ManyToOne(() => Category, (category) => category.transactions)
  @JoinColumn({ name: "categoryId" })
  category: Category

  @ManyToOne(() => User, (user) => user.transaction)
  @JoinColumn({ name: "userId" })
  user: User
}
