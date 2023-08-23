import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CategoryDetails } from "./category-detail.entity";
import { AuditEntity } from "./audit.entity";
import { BillRequest } from "./bill-request.entity";

@Entity()
export class Material extends AuditEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    name: string;
    @Column()
    quantity: number;
    @Column()
    description: string;
    @ManyToOne(() => CategoryDetails, categoryDetails => categoryDetails.id, { eager: true })
    materialGroup: CategoryDetails;
    @Column({ nullable: true, array: true, type: 'text' })
    images: string[];

    @OneToMany(() => BillRequest, billRequests => billRequests.material, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    billRequests: BillRequest[];
}
