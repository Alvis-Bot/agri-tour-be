import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Material } from "./material.entity";
import { PersonEntity } from "./person.entity";
import { AuditEntity } from "./audit.entity";

@Entity()
export class BillRequest extends AuditEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    quantity: number;

    @Column()
    description: string;

    @Column({
        type: 'int',
        default: 0,

    })
    status: number;
    @ManyToOne(() => Material, material => material.billRequests, { eager: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
    material: Material;

    @ManyToOne(() => PersonEntity, persons => persons.billRequests, { eager: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
    provider: PersonEntity;

}
