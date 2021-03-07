import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';

import Order from './Order';
import Restaurant from './Restaurant';

@Entity({ name: 'products' })
class Product {
  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @Column()
  public name: string;

  @Column()
  public description: string;

  @Column()
  public img_path: string;

  @Column()
  public price: number;

  @ManyToOne(() => Restaurant, restaurant => restaurant.products)
  @JoinColumn({ name: 'restaurant_id' })
  public restaurant: Restaurant | string;

  @ManyToMany(() => Order)
  @JoinTable({
    name: 'orders_products_products',
  })
  public orders: Order[];

  @Column()
  public type: string;

  @Column()
  public created_at: Date;

  @Column()
  public updated_at: Date;
}

export default Product;
