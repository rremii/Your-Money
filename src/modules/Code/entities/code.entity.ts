import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm"

@Entity()
@Unique(["code"])
export class Code extends BaseEntity implements ICode {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  code: string

  @Column()
  expTime: Date
}
