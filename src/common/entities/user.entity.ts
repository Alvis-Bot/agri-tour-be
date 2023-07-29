import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { AuditEntity } from "./audit.entity";
import * as bcrypt from 'bcrypt';
import { Permission } from "./permission.entity";
import { Group } from "./group.entity";
import { Exclude } from "class-transformer";
import { Farm } from "./farm.entity";
import { FarmingCalender } from "./farming_calender.entity";

@Entity('users')
export class User extends AuditEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: false })
  isLocked: boolean;


  // @ManyToOne(() => Group, group => group.users)
  // @JoinColumn({ name: 'group_id' })
  // group: Group;
  @ManyToMany(() => Group, group => group.users)
  @JoinTable({
    name: 'user_groups'
  })
  groups: Group[];
  @OneToMany(() => Farm, farm => farm.user)
  farms: Farm[];

  
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
  // Many-to-many relationship with FarmingCalender
  @ManyToMany(() => FarmingCalender, farmingCalender => farmingCalender.users)
  farmingCalenders: FarmingCalender[];

}