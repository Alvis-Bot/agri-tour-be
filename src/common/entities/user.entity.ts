import {BeforeInsert, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {AuditEntity} from "./audit.entity";
import * as bcrypt from 'bcrypt';
import {Group} from "./group.entity";
import {Exclude} from "class-transformer";
import {Farm} from "./farm.entity";
import {FarmingCalender} from "./farming_calender.entity";
import {Role} from "../enum";



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

  @Column({nullable: false , default: Role.USER, enum: Role})
  role: Role;

  @Column({ default: false })
  isLocked: boolean;

  // @ManyToMany(() => Group, group => group.users)
  // @JoinTable({
  //   name: 'user_groups'
  // })
  // groups: Group[];
  @OneToMany(() => Farm, farm => farm.user)
  farms: Farm[];

  // Many-to-many relationship with FarmingCalender
  @ManyToMany(() => FarmingCalender, farmingCalender => farmingCalender.users)
  farmingCalenders: FarmingCalender[];



  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

}