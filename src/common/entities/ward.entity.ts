import { District } from 'src/common/entities/district.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('wards')
export class Ward {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  code: number;
  @Column()
  codename: string;

  @Column()
  division_type: string;
  @Column()
  short_codename: string;

  @ManyToOne(() => District, district => district.wards)
  district: District;

}
