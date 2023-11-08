import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Land } from "./land.entity";
import { Crop } from "./crop.entity";
import { CareSchedule } from "./care-schedule.entity";
import { User } from "./user.entity";
import { AuditEntity } from "./audit.entity";

@Entity()
@Unique(['crop'])
export class Harvest extends AuditEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Land, lands => lands.harvests, { nullable: false })
    land: Land;


    @ManyToOne(() => Crop, crops => crops.harvests, { nullable: false })
    crop: Crop;

    @Column()
    start_date: string;

    @Column()
    end_date: string;
    @Column({
        type: 'int',
    })
    quantity: number;

    @Column({
        type: 'boolean',
        nullable: true
    })
    status: boolean;

    @ManyToOne(() => User, users => users.harvests)
    user: User;

    @Column({
        nullable: true
    })
    note: string;
}
