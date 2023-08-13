
import { Category } from 'src/common/entities/category.entity';
import { AuditEntity } from 'src/common/entities/audit.entity';
import { DynamicField } from 'src/common/abc';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity({ name: 'category_details'})
export class CategoryDetails extends AuditEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    key: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column({ type: 'jsonb', nullable: true })
    child_column: DynamicField

    @Column({ nullable: true })
    id_parent: string;

    @Column({ nullable: true, default: true })
    active: boolean;
    // Mối quan hệ Many-to-One với Category
    @ManyToOne(() => Category, category => category.details, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
    category: Category;

}
