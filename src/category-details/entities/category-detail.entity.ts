import { Category } from 'src/categories/entities/category.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class CategoryDetails {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    id_parent: string;

    @Column({ nullable: true ,default:true})
    active: boolean;
    // Mối quan hệ Many-to-One với Category
    @ManyToOne(() => Category, category => category.details,{onDelete:'SET NULL',onUpdate:'CASCADE'})
    category: Category;
}
