import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AreaLocation } from "./location.entity";
import { Farm } from "./farm.entity";
import { Land } from "./land.entity";



@Entity('areas')
export class Area {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type : 'varchar' , nullable : true , length : 100})
  description: string;

  @OneToMany(() => AreaLocation, location => location.area )
  locations: AreaLocation[];

  @ManyToOne(() => Farm , farm => farm.areas)
  @JoinColumn({ name: 'farm_id' })
  farm: Farm;

  @OneToMany(() => Land, land => land.area)
  lands: Land[];
}