import { CategoryDetails } from 'src/category-details/entities/category-detail.entity';
import { Entity, PrimaryGeneratedColumn, Column, Tree, TreeChildren, TreeParent, OneToMany } from 'typeorm';

@Entity()
@Tree("nested-set")
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    nullable: true
  })
  description: string;
  @TreeChildren()
  children: Category[];

  @TreeParent()
  parent: Category;

  @Column({ nullable: true, default: true })
  active: boolean;
  // Mối quan hệ One-to-Many với CategoryDetails
  @OneToMany(() => CategoryDetails, details => details.category, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  details: CategoryDetails[];
}
