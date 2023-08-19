import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CategoryDetails } from "./category-detail.entity";
import { Land } from "./land.entity";
import { Crop } from "./crop.entity";
import { AuditEntity } from "./audit.entity";

@Entity()
export class WorkOfDay extends AuditEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    implement_at: Date;

    @Column()
    completed_at: string;

    @Column()
    job: string;

    @Column()
    description: string;

    @ManyToOne(() => Land, lands => lands.workOfDays)
    land: Land;

    @ManyToOne(() => Crop, crops => crops.workOfDays)
    crop: Crop;
}
