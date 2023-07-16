import { District } from "src/common/entities/district.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('provinces')
export class Province {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;
    @Column()
    code: number;
    @Column()
    division_type: string;
    @Column()
    codename: string;
    @Column()
    phone_code: string;

    @OneToMany(() => District, district => district.province)
    districts: District[];
}
