import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm"
import { IUser } from "../users.interface"

// @Unique(["email"])
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
}
