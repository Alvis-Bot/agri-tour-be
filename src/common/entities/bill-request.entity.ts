import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Material } from "./material.entity";
import { PersonEntity } from "./person.entity";
import { AuditEntity } from "./audit.entity";

@Entity()
export class BillRequest extends AuditEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    quantity: number;

    @Column()
    description: string;

    @ManyToOne(() => Material, material => material.billRequests, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
    material: Material;

    @ManyToOne(() => PersonEntity, persons => persons.billRequests, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
    provider: PersonEntity;

}
