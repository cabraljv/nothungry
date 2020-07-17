import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createProducts1594084792613 implements MigrationInterface {
  private table = new Table({
    name: 'products',
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
        name: 'name',
        type: 'varchar',
        length: '100',
        isNullable: false,
      },
      {
        name: 'description',
        type: 'varchar',
        length: '255',
        isNullable: false,
      },
      {
        name: 'price',
        type: 'float',
        isNullable: false,
      },
      {
        name: 'img_path',
        type: 'varchar',
        length: '255',
        isNullable: true,
      },
      {
        name: 'type',
        type: 'int',
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
