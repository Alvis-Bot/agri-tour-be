import { AuditEntity } from "src/common/entities/audit.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Contact extends AuditEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    fullName: string;

    @Column()
    enterprise: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    description: string;
}
