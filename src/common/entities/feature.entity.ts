import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AuditEntity } from "./audit.entity";


@Entity('features')
export class Feature  extends AuditEntity{

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column()
  description: string;

  @Column({ default: false })
  isLocked: boolean;

}