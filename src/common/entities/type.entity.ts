import { Category } from "src/common/entities/category.entity";
import { AuditEntity } from "src/common/entities/audit.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Type extends AuditEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @OneToMany(() => Category, categories => categories.type)
    categories: Category[];
}
