import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Provider {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    phoneNumber: string;
    @Column()
    description: string;

    @Column({
        nullable: true, array: true, type: 'text'
    })
    images: string[];

}
