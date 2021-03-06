import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import Order from './Order';

@Entity({ name: 'users' })
class User {
  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @Column()
  public name!: string;

  @Column()
  public whatsapp!: string;

  @OneToMany(() => Order, order => order.restaurant)
  orders!: Order[];

  @Column()
  public created_at!: Date;

  @Column()
  public updated_at!: Date;
}

export default User;
