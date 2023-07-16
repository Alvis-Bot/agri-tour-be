import { Province } from 'src/common/entities/province.entity';
import { Ward } from 'src/common/entities/ward.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';


@Entity('districts')
export class District {
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
  @ManyToOne(() => Province, province => province.districts)
  province: Province;

  @OneToMany(() => Ward, ward => ward.district)
  wards: Ward[];

}
