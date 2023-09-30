import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm"
import { IUser } from "../users.interface"
import { Account } from "../../account/entities/account.entity"
import { Category } from "../../category/entities/category.entity"
import { Transaction } from "../../transaction/entities/transaction.entity"
import { AccountHistoryPoint } from "../../accountHistory/entities/accountHistoryPoint.entity"

@Entity()
export class User extends BaseEntity implements IUser {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  email: string

  @Column({ nullable: true })
  password: string

  @Column({ nullable: true })
  avatar: string

  @Column({ nullable: true })
  refreshToken: string

  @OneToMany(() => Account, (account) => account.user)
  accounts: Account[]

  @OneToMany(
    () => AccountHistoryPoint,
    (accountHistoryPoint) => accountHistoryPoint.user,
  )
  accountHistoryPoints: AccountHistoryPoint[]

  @OneToMany(() => Category, (category) => category.user)
  categories: Category[]

  @OneToMany(() => Category, (category) => category.user)
  transaction: Transaction[]
}
