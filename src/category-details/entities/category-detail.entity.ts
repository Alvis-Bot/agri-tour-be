
import { randomUUID } from 'crypto';
import { Category } from 'src/categories/entities/category.entity';
import { AuditEntity } from 'src/common/entities/audit.entity';
import { DynamicField } from 'src/common/interface';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, PrimaryColumn, BeforeInsert } from 'typeorm';

@Entity()
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
