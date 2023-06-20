import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('soil_types')
export class SoilType{
   @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;
}