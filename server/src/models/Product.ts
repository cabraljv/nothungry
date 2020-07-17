import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import Restaurant from './Restaurant';

@Entity({ name: 'products' })
class Product {
  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @Column()
  public name!: string;

  @Column()
  public description!: string;

  @Column()
  public img_path!: string;

  @Column()
  public price!: number;

  @ManyToOne(() => Restaurant, restaurant => restaurant.products)
  @JoinColumn({ name: 'restaurant_id' })
  public restaurant!: Restaurant | string;

  @Column()
  public type!: string;

  @Column()
  public created_at!: Date;

  @Column()
  public updated_at!: Date;
}

export default Product;
