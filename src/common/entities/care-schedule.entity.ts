import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Land } from "./land.entity";
import { Crop } from "./crop.entity";
import { DiseasePayload, StatusDisease } from "../interface/care-schedule";

@Entity()
export class CareSchedule {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Land, lands => lands.careSchedules, { nullable: false })
    land: Land;
    @ManyToOne(() => Crop, crops => crops.careSchedules, { nullable: false })
    crop: Crop;
    
    @Column({
        type: 'jsonb',
        nullable: false
    })
    detect: DiseasePayload;

    @Column({
        type: 'jsonb',
        nullable: false
    })
    status: StatusDisease;

}
