import {AuditEntity} from "./audit.entity";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {SuppliesStatus} from "../../supplies/supplies";


@Entity('supplies')
export class Supplies extends AuditEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false})
    name: string;

    @Column( { nullable: false , type: 'float' , default: 0 })
    money: number;

    @Column({nullable: false})
    //số lượng
    quantity: number;

    @Column({nullable: false})
    // thời gian nhập kho
    time: Date;

    @Column({nullable: true})
    // ghi chú
    note?: string;

    @Column({ nullable: true, array: true, type: 'text' })
    // nhiều hình ảnh
    images : string[];

    @Column({nullable: false , enum : SuppliesStatus , default: SuppliesStatus.INVENTORY})
    // trạng thái
    status: number;
}