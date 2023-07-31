import { CategoryDetails } from 'src/category-details/entities/category-detail.entity';
import { Type } from 'src/types/entities/type.entity';
import { Entity, PrimaryGeneratedColumn, Column, Tree, TreeChildren, TreeParent, OneToMany, ManyToOne, BeforeInsert } from 'typeorm';

@Entity()
@Tree("nested-set")
export class Category {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  description: string;

  // @Column()
  // type: string

  @TreeChildren()
  children: Category[];

  @TreeParent()
  parent: Category;
  
  @Column({ nullable: true, default: true })
  active: boolean;
  // Mối quan hệ One-to-Many với CategoryDetails
  @OneToMany(() => CategoryDetails, details => details.category, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  details: CategoryDetails[];

  @ManyToOne(() => Type, type => type.categories)
  type: Type

}
