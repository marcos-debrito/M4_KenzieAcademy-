import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Schedule } from "./Schedule.entity";
import { Category } from "./Category.entity";
import { Address } from "./Addresses.entity";

@Entity("realEstates")
export class RealEstate {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "boolean", default: false })
  sold: Boolean | null;

  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  value: number | string;

  @Column()
  size: number;

  @CreateDateColumn({ type: "date" })
  createdAt: string;

  @UpdateDateColumn({ type: "date" })
  updatedAt: string;

  @OneToMany(() => Schedule, (s) => s.realEstate)
  schedules: Array<Schedule>;

  @ManyToOne(() => Category, (c) => c.realEstate)
  category: Category;

  @OneToOne(() => Address)
  @JoinColumn() //LADO DA FOREIGN KEY
  address: Address;
}
