import {
  Column,
  Entity,
  Geometry,
  Index,
  JoinColumn,
  ManyToOne,
  MultiPoint, OneToMany,
  Point,
  PrimaryGeneratedColumn
} from "typeorm";
import { User } from "./user.entity";
import { Area } from "./area.entity";
import { Location } from "../interface";



@Entity('farms')
export class Farm {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'jsonb', nullable: true })
  location: Location;

  @ManyToOne(() => User , user => user.farms)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Area, area => area.farm )
  areas: Area[];

}