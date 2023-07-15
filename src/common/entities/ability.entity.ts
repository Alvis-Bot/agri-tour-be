import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";
import { Permission } from "./permission.entity";

@Entity()
export class Ability {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Role, role => role.abilities)
  roles: Role[];

  @ManyToMany(() => Permission, permission => permission.abilities)
  permissions: Permission[];
}