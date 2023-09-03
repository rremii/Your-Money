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
import { User } from "../../users/entities/user.entity"
import { CategoryType, ICategory } from "../category.interface"
import { Account } from "../../account/entities/account.entity"
import { Transaction } from "../../transaction/entities/transaction.entity"

@Unique(["name"])
@Entity()
export class Category extends BaseEntity implements ICategory {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  color: string

  @Column()
  userId: number

  @Column()
  icon: string

  @Column()
  type: CategoryType

  @ManyToOne(() => User, (user) => user.categories)
  @JoinColumn({ name: "userId" })
  user: User

  @OneToMany(() => Transaction, (transaction) => transaction.category)
  transactions: Transaction[]
}
