import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AuditEntity } from "./audit.entity";
import { Group } from "./group.entity";
import { Feature } from "./feature.entity";


@Entity('permissions')
export class Permission extends AuditEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column({ default: false })
  isLocked: boolean;

  @ManyToOne(() => Group, group => group.permissions)
  groups: Group[];

}