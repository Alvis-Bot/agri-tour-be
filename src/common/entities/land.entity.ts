import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Area } from "./area.entity";
import { Location } from "../abc";
import { FarmingCalender } from "./farming_calender.entity";
import { AuditEntity } from "./audit.entity";
import { CategoryDetails } from "src/common/entities/category-detail.entity";
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
  acreage: number; // diện tích

  @ManyToOne(() => CategoryDetails, categoryDetail => categoryDetail.id)
  soilType: CategoryDetails;

  @ManyToOne(() => Area, area => area.lands, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
  area: Area;

  @Column({ nullable: true, array: true, type: 'text' })
  images: string[];

  @Column({ type: 'jsonb', nullable: true })
  locations: Location[];

  @ManyToOne(() => CategoryDetails, categoryDetail => categoryDetail.id)
  productType: CategoryDetails;


  @OneToMany(() => FarmingCalender, farmingCalender => farmingCalender.land, { cascade: true, onDelete: 'CASCADE' })
  farmingCalenders: FarmingCalender[];
}