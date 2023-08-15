import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AuditEntity } from "./audit.entity";
import { Type } from "./type.entity";

@Entity()
export class PersonEntity extends AuditEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    phoneNumber: string;

    @Column()
    debt: number;

    @Column()
    description: string;

    @ManyToOne(() => Type, types => types.id)
    type: Type;
}
