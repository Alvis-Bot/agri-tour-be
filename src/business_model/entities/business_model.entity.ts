import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BusinessModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;
}
