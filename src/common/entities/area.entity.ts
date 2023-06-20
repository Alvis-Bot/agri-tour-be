import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Location } from "./location.entity";



@Entity('lands')
export class Land {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type : 'varchar' , nullable : true , length : 100})
  description: string;

  @OneToMany(() => Location, location => location.land )
  locations: Location[];

  // @Column()
  // area: number;
}