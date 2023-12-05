import { AuditEntity } from "./audit.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Farm } from "./farm.entity";


@Entity('agricultural-products')
export class AgriculturalProducts extends AuditEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    money: number;

    @Column()
    //số lượng
    quantity: string;

    @Column()
    // khối lượng
    weight: string;

    @ManyToOne(() => Farm, farm => farm.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    farm: Farm;

    @Column()
    // thời gian nhập kho
    time: Date;

    @Column({ nullable: true, array: true, type: 'text' })
    // nhiều hình ảnh
    images: string[];
}