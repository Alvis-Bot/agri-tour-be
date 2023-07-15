import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
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
  permissions: Permission[];

  @ManyToMany(() => Ability, ability => ability.roles)
  abilities: Ability[];
}