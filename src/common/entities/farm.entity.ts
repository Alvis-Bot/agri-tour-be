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

  @Column({ nullable: true })
  region: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  user_representative: string;

  @Column({ nullable: true })
  email: string;

  @Column({ type: 'jsonb', nullable: true })
  location: ILocation;

  @ManyToOne(() => User, user => user.farms, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Area, area => area.farm, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  areas: Area[];

  @Column({ nullable: true })
  image: string;
}