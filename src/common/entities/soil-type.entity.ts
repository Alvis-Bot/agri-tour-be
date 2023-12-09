import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AuditEntity } from "./audit.entity";
import { Land } from "./land.entity";


@Entity('soil_types')
export class SoilType extends AuditEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @OneToMany(() => Land, land => land.soilType)
    lands: Land[];
}