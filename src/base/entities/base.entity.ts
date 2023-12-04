import { AuditEntity } from 'src/common/entities/audit.entity';
import { PrimaryGeneratedColumn, Column } from 'typeorm';

export abstract class BaseEntity extends AuditEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    name: string;

    @Column({ nullable: true })
    description: string;


}
