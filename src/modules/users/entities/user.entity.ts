import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm"
import { IUser } from "../users.interface"

@Entity()
@Unique(["email"])
export class User extends BaseEntity implements IUser {
  @PrimaryGeneratedColumn()
  id: number

  // @Column()
  // userName: string

  @Column()
  email: string

  @Column({ nullable: true })
  password: string

  // @Column()
  // avatar: string

  @Column({ nullable: true })
  refreshToken: string
}
