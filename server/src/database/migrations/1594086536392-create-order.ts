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
        isNullable: false,
      },
      {
        name: 'total',
        type: 'float',
        isNullable: false,
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
        isNullable: false,
      },
      {
        name: 'reference',
        type: 'varchar',
        length: '255',
        isNullable: true,
      },
      {
        name: 'whatsapp',
        type: 'varchar',
        length: '40',
        isNullable: false,
      },
      {
        name: 'accepted',
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
        length: '255',
        isNullable: false,
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

  private foreginKey = new TableForeignKey({
    columnNames: ['restaurant_id'],
    referencedTableName: 'restaurants',
    onDelete: 'CASCADE',
    referencedColumnNames: ['id'],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
    await queryRunner.createForeignKey(this.table, this.foreginKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
