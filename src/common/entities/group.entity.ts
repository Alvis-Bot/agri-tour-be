

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
import { Permission } from "./permission.entity";
import { User } from "./user.entity";


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


  @OneToMany(() => Permission , permission => permission.groups)
  permissions: Permission[];

  @OneToMany(() => User , user => user.group ,{
    cascade : true
  })
  users: User[];

}