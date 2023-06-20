import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { SoilType } from "./soil-type.entity";
import { Area } from "./area.entity";
import { LandLocation, AreaLocation } from "./location.entity";


@Entity('lands')
export class Land{

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToOne(() => SoilType)
  @JoinColumn()
  soilType: SoilType;

  @ManyToOne(() => Area, area => area.lands)
  area: Area;

  @OneToMany(() => LandLocation, landLocation => landLocation.land)
  locations: LandLocation[];
}