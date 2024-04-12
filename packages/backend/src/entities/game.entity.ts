import { IGame } from "@pingpongpal/shared";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Exclude } from "class-transformer";

@Entity()
export class Game implements IGame {
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @ManyToOne(() => User)
  user: User;

  @Column({ length: 128 })
  displayName1: string;

  @Column({ length: 128 })
  displayName2: string;

  @Column({ type: "smallint", unsigned: true })
  score1: number;

  @Column({ type: "smallint", unsigned: true })
  score2: number;

  @CreateDateColumn()
  createdAt: Date;
}
