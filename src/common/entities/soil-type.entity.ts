import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AuditEntity } from "./audit.entity";


@Entity('soil_types')
export class SoilType  extends AuditEntity{
   @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @OneToMany(() => SoilType, soilType => soilType.lands)
    lands: SoilType[];
}