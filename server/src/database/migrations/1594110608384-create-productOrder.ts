import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createProductOrder1594110608384 implements MigrationInterface {
  private table = new Table({
    name: 'orders_products_products',
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
        name: 'ordersId',
        type: 'uuid',
        isNullable: false,
      },
      {
        name: 'productsId',
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

  private restaurantForeginKey = new TableForeignKey({
    columnNames: ['ordersId'],
    referencedTableName: 'orders',
    onDelete: 'SET NULL',
    referencedColumnNames: ['id'],
  });

  private productForeginKey = new TableForeignKey({
    columnNames: ['productsId'],
    referencedTableName: 'products',
    onDelete: 'SET NULL',
    referencedColumnNames: ['id'],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
    await queryRunner.createForeignKey(this.table, this.productForeginKey);
    await queryRunner.createForeignKey(this.table, this.restaurantForeginKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
