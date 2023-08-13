import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { User } from "./user.entity";
import { Area } from "./area.entity";
import { Location as ILocation } from "../abc";
import { AuditEntity } from "./audit.entity";



@Entity('farms')
export class Farm extends AuditEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  business_model: string;

  @Column({ nullable: true })
  business_type: string;

  @Column({ nullable: true })
  province: string;

  @Column({ nullable: true })
  district: string;

  @Column({ nullable: true })
  wards: string;

  @Column({ nullable: true })
  address: string;

  @Column({ type: 'jsonb', nullable: true })
  location: ILocation;

  @ManyToOne(() => User, user => user.farms)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Area, area => area.farm)
  areas: Area[];

  @Column({ nullable: true })
  image: string;
}