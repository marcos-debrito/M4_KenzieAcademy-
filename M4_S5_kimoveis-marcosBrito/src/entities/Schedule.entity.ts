import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User.entity";
import { RealEstate } from "./RealEstate.entity";

@Entity("schedules")
export class Schedule {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @CreateDateColumn({ type: "date" })
  date: string;

  @Column()
  hour: string;

  @ManyToOne(() => User, (u) => u.schedules)
  user: User;

  @ManyToOne(() => RealEstate, (r) => r.schedules)
  realEstate: RealEstate;
}
