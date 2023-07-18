import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Land } from "./land.entity";
import { Product } from "./product.entity";
import { CategoryDetails } from "src/category-details/entities/category-detail.entity";
import { User } from "./user.entity";

@Entity()
export class FarmingCalender {
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

    @OneToMany(() => CategoryDetails, categoryDetails => categoryDetails.name)
    categoryDetails: CategoryDetails[];

    @OneToMany(() => Land, land => land.farmingCalender, { onDelete: 'SET NULL' })
    lands: Land[];

    @OneToMany(()=>User,user=>user.farmingCalender, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
    users:User[];
}
