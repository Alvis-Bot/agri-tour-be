import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('soil_types')
export class SoilType{
   @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @OneToMany(() => SoilType, soilType => soilType.lands)
    lands: SoilType[];
}