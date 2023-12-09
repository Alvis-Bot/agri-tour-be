import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";
import { AuditEntity } from "./audit.entity";

@Entity()
export class Ability extends AuditEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Role, role => role.abilities)
  roles: Role[];

}