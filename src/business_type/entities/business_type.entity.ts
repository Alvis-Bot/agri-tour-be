import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BusinessType {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

}
