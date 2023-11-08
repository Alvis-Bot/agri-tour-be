import { BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AuditEntity } from "./audit.entity";
import * as bcrypt from 'bcrypt';
import { Exclude } from "class-transformer";
import { Farm } from "./farm.entity";
import { FarmingCalender } from "./farming_calender.entity";
import { Role } from "../enum";
import { Harvest } from "./harvest.entity";



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

  @Column({ nullable: false, default: Role.USER, enum: Role })
  role: Role;

  @Column({ default: false })
  isLocked: boolean;

  @OneToMany(() => Farm, farm => farm.user)
  farms: Farm[];

  @OneToMany(() => Harvest, harvests => harvests.user)
  harvests: Harvest[];

  @ManyToMany(() => FarmingCalender, farmingCalender => farmingCalender.users)
  farmingCalenders: FarmingCalender[];


  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    // Check if the password field has been modified before hashing
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

}