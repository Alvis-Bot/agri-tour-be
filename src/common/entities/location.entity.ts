import { Column, Entity, Index, JoinColumn, ManyToOne, Point, PrimaryGeneratedColumn } from "typeorm";
import { Area } from "./area.entity";
import { Land } from "./land.entity";


@Entity('area_locations')
export class AreaLocation {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable : false , type: 'varchar' , length: 20})
  type: string;


  @Column("text", { array: true })
  coordinates: [number, number];

  @ManyToOne(() => Area, area => area.locations)
  @JoinColumn({ name: 'area_id' })
  area: Area;
}


@Entity('land_locations')
export class LandLocation{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable : false , type: 'varchar' , length: 20})
    type: string;

    @Column("text", { array: true })
    coordinates: [number, number];

    @ManyToOne(() => Land, land => land.locations)
    @JoinColumn({ name: 'land_id' })
    land: Land;
}