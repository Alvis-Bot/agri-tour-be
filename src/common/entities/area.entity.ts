import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Farm } from "./farm.entity";
import { Land } from "./land.entity";
import { Location } from "../interface";
import { AuditEntity } from "./audit.entity";



@Entity('areas')
export class Area  extends AuditEntity{

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'varchar', nullable: true, length: 100 })
  description: string;

  
  @Column({ type: 'jsonb', nullable: true })
  locations: Location[];

  @ManyToOne(() => Farm, farm => farm.areas)
  @JoinColumn({ name: 'farm_id' })
  farm: Farm;

  @Column({ nullable: true, array: true, type: 'text' })
  avatars: string[];

  @Column({ type: 'float', nullable: true, default: 0 })
  acreage: number;

  //vùng
  @OneToMany(() => Land, land => land.area, { cascade: true, onDelete: 'CASCADE' })
  lands: Land[];

}