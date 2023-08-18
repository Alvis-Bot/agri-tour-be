import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {AuditEntity} from "./audit.entity";
import {CategoryDetails} from "./category-detail.entity";


@Entity('crops')
export class Crop extends AuditEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false})
    name: string;

    //loại bệnh thường gặp
    @Column({ nullable: false })
    disease: string;

    // đặc tính sinh trưởng
    @Column({ nullable: false })
    growth: string;

    // đặc tính sử dụng cây trồng
    @Column({ nullable: false })
    use: string;

    // thu hoạch
    @Column({ nullable: false })
    harvest: string;

    // giá bán giống cây trồng
    @Column({ nullable: false , type : 'decimal' , precision : 10 , scale : 2 })
    price: number;



    // nhóm cây trồng
    @ManyToOne(() => CategoryDetails, categoryDetails => categoryDetails.id)
    groupCrop: CategoryDetails;

    // ảnh cây trồng
    @Column({ nullable: true, array: true, type: 'text' })
    images: string[];




}