import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Land } from "./land.entity";
import { CategoryDetails } from "src/category-details/entities/category-detail.entity";
import { User } from "./user.entity";
import { AuditEntity } from "./audit.entity";

@Entity()
export class FarmingCalender  extends AuditEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    product_name: string;

    @Column()
    numberOfVarites: number;

    @Column()
    startDay: Date;

    @Column()
    endDate: Date;

    @Column()
    seedProvider: string;

    @Column()
    expectOutput: string;

    @Column()
    unit: string;

    @ManyToOne(() => CategoryDetails, categoryDetails => categoryDetails.name)
    categoryDetail: CategoryDetails;

    @ManyToOne(() => Land, land => land.farmingCalenders, { onDelete: 'SET NULL' })
    land: Land;

    @ManyToOne(() => User, user => user.farmingCalenders, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
    user: User;
}
