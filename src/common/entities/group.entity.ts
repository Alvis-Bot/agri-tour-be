

import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { AuditEntity } from "./audit.entity";
import { User } from "./user.entity";
import { Role } from "./role.entity";


@Entity('groups')
export class Group extends AuditEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: false })
  isDeleted: boolean;


  // @ManyToMany(() => User, user => user.groups, {
  //   cascade: true
  // })
  // users: User[];

  @ManyToMany(() => Role, role => role.groups, {
    cascade: true
  })
  @JoinTable({
    name:'group_roles'
  })
  roles: Role[];
}