import {AuditEntity} from "./audit.entity";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {IngredientsStatus} from "../../ingredients/ingredients";


@Entity('ingredients')
export class Ingredient extends AuditEntity{

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

    @Column()
    // thông tin hàng hóa
    information: string;

    @Column()
    // thời gian nhập kho
    time: Date;

    @Column({
        type: 'enum',
        enum: IngredientsStatus,
        default: IngredientsStatus.INVENTORY
    })
    // trạng thái
    status: IngredientsStatus;

    @Column({ nullable: true, array: true, type: 'text' })
        // nhiều hình ảnh
    images : string[];
}