import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import Product from './Product';
import Restaurant from './Restaurant';

@Entity({ name: 'orders' })
class Order {
  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @Column()
  public reciver!: string;

  @Column()
  public total!: number;

  @Column()
  public observation!: string;

  @Column()
  public whatsapp!: string;

  @Column()
  public adress!: string;

  @Column()
  public reference!: string;

  @Column()
  public accepted!: boolean;

  @Column()
  public concluided!: boolean;

  @Column()
  public denied!: boolean;

  @Column()
  public payment_method!: string;

  @ManyToOne(() => Restaurant, restaurant => restaurant.orders)
  @JoinColumn({ name: 'restaurant_id' })
  public restaurant!: Restaurant | string;

  @Column()
  public created_at!: Date;

  @Column()
  public updated_at!: Date;

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];
}

export default Order;
