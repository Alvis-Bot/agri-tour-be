import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AuditEntity } from "./audit.entity";
import { Type } from "./type.entity";
import { BillRequest } from "./bill-request.entity";

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

    @OneToMany(() => BillRequest, billRequest => billRequest.provider, { onDelete: 'SET NULL', cascade: true })
    billRequests: BillRequest[];

}
