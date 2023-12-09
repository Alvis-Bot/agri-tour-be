import { Column, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export class Diseasesbook {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    product_name: string;

    @Column({ type: 'jsonb', nullable: true })
    history: {
        name: string;
        works: []

    }
}

