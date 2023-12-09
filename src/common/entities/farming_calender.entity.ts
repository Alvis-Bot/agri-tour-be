import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Land } from "./land.entity";
import { CategoryDetails } from "src/common/entities/category-detail.entity";
import { User } from "./user.entity";
import { AuditEntity } from "./audit.entity";

@Entity()
export class FarmingCalender extends AuditEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    product_name: string;

    @ManyToOne(() => CategoryDetails, categoryDetails => categoryDetails.id)
    productType: CategoryDetails;

    @Column()
    numberOfVarites: number; // số lượng giống

    @Column()
    startDay: Date;

    @Column()
    endDate: Date;

    @Column()
    seedProvider: string; // nhà cung cấp giống

    @Column()
    expectOutput: number; // dự kiến sản lượng

    @Column()
    unit: string; // đơn vị

    @ManyToOne(() => Land, land => land.farmingCalenders, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
    land: Land;

    // Many-to-many relationship with User
    @ManyToMany(() => User, user => user.farmingCalenders)
    @JoinTable({
        name: 'user_farming_calenders',
    })
    users: User[];
}
