import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Exclude } from "class-transformer";
import { IAccessKey } from "@pingpongpal/shared";

@Entity()
export class AccessKey implements IAccessKey {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @ManyToOne(() => User)
  user: User;

  @Column({ length: 128 })
  label: string;

  @Column({ length: 36, unique: true })
  key: string;

  @CreateDateColumn()
  createdAt: Date;
}
