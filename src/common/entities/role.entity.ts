import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "./group.entity";
import { Ability } from "./ability.entity";
import { AuditEntity } from "./audit.entity";

@Entity()
export class Role  extends AuditEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    default:false
  })
  isLocked: boolean;

  @ManyToMany(() => Group, group => group.roles)
 
  groups: Group[];

  @ManyToMany(() => Ability, ability => ability.roles)
  @JoinTable({
    name:'role_abilities'
  })
  abilities: Ability[];
}