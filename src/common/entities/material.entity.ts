import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CategoryDetails } from "./category-detail.entity";
import { AuditEntity } from "./audit.entity";

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
    @ManyToOne(() => CategoryDetails, categoryDetails => categoryDetails.id)
    materialGroup: CategoryDetails;
    @Column({ nullable: true, array: true, type: 'text' })
    images: string[];
}
