import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AuditEntity } from "./audit.entity";

@Entity()
export class Provider extends AuditEntity {
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
}
