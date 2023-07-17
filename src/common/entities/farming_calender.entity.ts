import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Land } from "./land.entity";
import { Product } from "./product.entity";

@Entity()
export class FarmingCalender {
    @PrimaryGeneratedColumn('uuid')
    id: string;



    @ManyToOne(() => Land, land => land.farmingCalender, {  onDelete: 'SET NULL' })
    land: Land;
}
