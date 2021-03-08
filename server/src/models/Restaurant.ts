import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import Order from './Order';
import Product from './Product';

@Entity({ name: 'restaurants' })
class Restaurant {
  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @Column()
  public name!: string;

  @Column()
  public phone!: string;

  @Column()
  public whatsapp_number!: string;

  @Column()
  public password!: string;

  @Column()
  public url!: string;

  @Column()
  public open!: boolean;

  @Column()
  public img_path!: string;

  @Column()
  public created_at!: Date;

  @Column()
  public updated_at!: Date;

  @OneToMany(() => Product, product => product.restaurant)
  products!: Product[];

  @OneToMany(() => Order, order => order.restaurant)
  orders!: Order[];
}

export default Restaurant;
