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
import User from './User';

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
  public adress!: string;

  @Column()
  public reference!: string;

  @Column()
  public accepted!: boolean;

  @Column()
  public sended!: boolean;

  @Column()
  public concluided!: boolean;

  @Column()
  public denied!: boolean;

  @Column()
  public payment_method!: string;

  @ManyToOne(() => Restaurant, restaurant => restaurant.orders)
  @JoinColumn({ name: 'restaurant_id' })
  public restaurant!: Restaurant | string;

  @ManyToOne(() => User, user => user.orders)
  @JoinColumn({ name: 'user_id' })
  public user: User;

  @Column()
  public created_at: Date;

  @Column()
  public updated_at: Date;

  @ManyToMany(() => Product)
  @JoinTable()
  public products: Product[];
}

export default Order;
