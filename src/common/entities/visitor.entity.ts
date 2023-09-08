import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AuditEntity } from "./audit.entity";

@Entity()
export class Visitor extends AuditEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({
        type: 'int'
    })
    quantity: number;

    @Column()
    receptionDay: string;

    @Column()
    description: string;
    @Column({
        type: 'int'
    })
    status: number;
}
