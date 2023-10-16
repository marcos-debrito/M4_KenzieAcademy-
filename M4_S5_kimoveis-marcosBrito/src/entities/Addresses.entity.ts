import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { RealEstate } from "./RealEstate.entity";

@Entity("addresses")
export class Address {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 45 })
  street: string;

  @Column({ length: 8 })
  zipCode: string;

  @Column({ type: "varchar", nullable: true, length: 7 })
  number: number | null;

  @Column({ length: 20 })
  city: string;

  @Column({ length: 2 })
  state: string;

  @OneToOne(() => RealEstate, (r) => r.address)
  realEstate: RealEstate;
}
