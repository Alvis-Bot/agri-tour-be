import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('features')
export class Feature {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column()
  description: string;

  @Column({ default: false })
  isLocked: boolean;


}