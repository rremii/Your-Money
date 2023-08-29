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
import { IAccount } from "../../account/account.interface"
import { ICategory } from "../category.interface"

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

  @ManyToOne(() => User, (user) => user.categories)
  @JoinColumn({ name: "userId" })
  user: User
}
