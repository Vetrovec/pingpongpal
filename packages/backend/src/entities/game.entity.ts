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
  @Column({ type: "uuid" })
  payloadId: string;

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

  @Column({ type: "decimal", precision: 3, scale: 1 })
  temperature: number;

  @CreateDateColumn()
  createdAt: Date;
}
