import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "./group.entity";
import { Permission } from "./permission.entity";
import { Ability } from "./ability.entity";

@Entity()
export class Role {
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

  @ManyToMany(() => Permission, permission => permission.roles)
  @JoinTable({
    name:'role_permissions'
  })
  permissions: Permission[];

  @ManyToMany(() => Ability, ability => ability.roles)
  @JoinTable({
    name:'role_abilities'
  })
  abilities: Ability[];
}