import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createOrder1594086536392 implements MigrationInterface {
  private table = new Table({
    name: 'orders',
    columns: [
      {
        name: 'id',
        isPrimary: true,
        isNullable: false,
        isGenerated: true,
        generationStrategy: 'uuid',
        type: 'uuid',
      },
      {
        name: 'reciver',
        type: 'varchar',
        length: '100',
        isNullable: true,
      },
      {
        name: 'total',
        type: 'float',
        isNullable: false,
        default: 0,
      },
      {
        name: 'observation',
        type: 'varchar',
        length: '255',
        isNullable: true,
      },
      {
        name: 'adress',
        type: 'varchar',
        length: '255',
        isNullable: true,
      },
      {
        name: 'reference',
        type: 'varchar',
        length: '255',
        isNullable: true,
      },
      {
        name: 'user_id',
        type: 'uuid',
        isNullable: false,
      },
      {
        name: 'accepted',
        type: 'boolean',
        isNullable: false,
        default: false,
      },
      {
        name: 'sended',
        type: 'boolean',
        isNullable: false,
        default: false,
      },
      {
        name: 'denied',
        type: 'boolean',
        isNullable: false,
        default: false,
      },
      {
        name: 'concluided',
        type: 'boolean',
        isNullable: false,
        default: false,
      },
      {
        name: 'payment_method',
        type: 'varchar',
        length: '50',
        isNullable: true,
      },
      {
        name: 'restaurant_id',
        type: 'uuid',
        isNullable: false,
      },
      {
        name: 'created_at',
        type: 'timestamptz',
        isNullable: false,
        default: 'now()',
      },
      {
        name: 'updated_at',
        type: 'timestamptz',
        isNullable: false,
        default: 'now()',
      },
    ],
  });

  private restaurant_fk = new TableForeignKey({
    columnNames: ['restaurant_id'],
    referencedTableName: 'restaurants',
    onDelete: 'CASCADE',
    referencedColumnNames: ['id'],
  });

  private user_fk = new TableForeignKey({
    columnNames: ['user_id'],
    referencedTableName: 'users',
    onDelete: '',
    referencedColumnNames: ['id'],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
    await queryRunner.createForeignKey(this.table, this.restaurant_fk);
    await queryRunner.createForeignKey(this.table, this.user_fk);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
