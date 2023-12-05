import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Farm } from "./farm.entity";
import { Land } from "./land.entity";
import { Location } from "../abc";



@Entity('areas')
export class Area {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'varchar', nullable: true, length: 100 })
  description: string;

  // @OneToMany(() => AreaLocation, location => location.area )
  // locations: AreaLocation[];

  @Column({ type: 'jsonb', nullable: true })
  locations: Location[];

  @ManyToOne(() => Farm, farm => farm.areas, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'farm_id' })
  farm: Farm;

  @Column({ nullable: true, array: true, type: 'text' })
  avatars: string[];

  @Column({ type: 'float', nullable: true, default: 0 })
  acreage: number;


  @OneToMany(() => Land, land => land.area)
  lands: Land[];
}