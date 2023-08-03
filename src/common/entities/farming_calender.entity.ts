import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Land } from "./land.entity";
import { CategoryDetails } from "src/category-details/entities/category-detail.entity";
import { User } from "./user.entity";
import { AuditEntity } from "./audit.entity";

@Entity()
export class FarmingCalender extends AuditEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    product_name: string;

    @Column()
    productType: string;

    @Column()
    numberOfVarites: number;

    @Column()
    startDay: Date;

    @Column()
    endDate: Date;

    @Column()
    seedProvider: string;

    @Column()
    expectOutput: number;

    @Column()
    unit: string;

    @ManyToOne(() => Land, land => land.farmingCalenders, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
    land: Land;

    // Many-to-many relationship with User
    @ManyToMany(() => User, user => user.farmingCalenders)
    @JoinTable({
        name: 'user_farming_calenders',

    })
    users: User[];
}
