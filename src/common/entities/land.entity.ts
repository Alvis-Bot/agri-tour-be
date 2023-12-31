import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { SoilType } from "./soil-type.entity";
import { Area } from "./area.entity";
import { Location } from "../interface";

@Entity('lands')
export class Land{

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => SoilType, soilType => soilType.lands)
  @JoinColumn()
  soilType: SoilType;

  @ManyToOne(() => Area, area => area.lands)
  area: Area;

  @Column({ nullable: true , array : true , type : 'text'})
  images: string[];

  @Column({ type: 'jsonb', nullable: true })
  locations: Location[];
}