import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { SoilType } from "./soil-type.entity";
import { Area } from "./area.entity";
import { Location } from "../interface";
import { FarmingCalender } from "./farming_calender.entity";
import { AuditEntity } from "./audit.entity";
//vùng canh tác
@Entity('lands')
export class Land extends AuditEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  color: string;
  @Column({
    nullable: true,
  })
  acreage: number;
  @ManyToOne(() => SoilType, soilType => soilType.lands)
  @JoinColumn()
  soilType: SoilType;


  @ManyToOne(() => Area, area => area.lands, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  area: Area;


  @Column({ nullable: true, array: true, type: 'text' })
  images: string[];

  @Column({ type: 'jsonb', nullable: true })
  locations: Location[];

  @OneToMany(() => FarmingCalender, farmingCalender => farmingCalender.land, { cascade: true, onDelete: 'CASCADE' })
  farmingCalenders: FarmingCalender[];
}