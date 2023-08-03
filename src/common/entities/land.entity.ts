import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { SoilType } from "./soil-type.entity";
import { Area } from "./area.entity";
import { Location } from "../interface";
import { FarmingCalender } from "./farming_calender.entity";
import { AuditEntity } from "./audit.entity";
import { CategoryDetails } from "src/category-details/entities/category-detail.entity";
//vùng canh tác
@Entity('lands')
export class Land extends AuditEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => CategoryDetails, categoryDetail => categoryDetail.id)
  productType: CategoryDetails;

  @Column({
    nullable: true,
  })
  acreage: number;

  @ManyToOne(() => CategoryDetails, categoryDetail => categoryDetail.id)
  soilType: CategoryDetails;


  @ManyToOne(() => Area, area => area.lands, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  area: Area;


  @Column({ nullable: true, array: true, type: 'text' })
  images: string[];

  @Column({ type: 'jsonb', nullable: true })
  locations: Location[];

  @OneToMany(() => FarmingCalender, farmingCalender => farmingCalender.land, { cascade: true, onDelete: 'CASCADE' })
  farmingCalenders: FarmingCalender[];
}