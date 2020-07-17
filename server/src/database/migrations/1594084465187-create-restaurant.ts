import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createRestaurant1594084465187 implements MigrationInterface {
  private table = new Table({
    name: 'restaurants',
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
        name: 'password',
        type: 'varchar',
        length: '100',
        isNullable: false,
      },
      {
        name: 'name',
        type: 'varchar',
        length: '100',
        isNullable: false,
      },
      {
        name: 'phone',
        type: 'varchar',
        length: '15',
        isNullable: false,
      },
      {
        name: 'img_path',
        type: 'varchar',
        length: '255',
        isNullable: false,
      },
      {
        name: 'whatsapp_number',
        type: 'varchar',
        length: '255',
        isNullable: false,
      },
      {
        name: 'url',
        type: 'varchar',
        length: '20',
        isNullable: false,
      },
      {
        name: 'open',
        type: 'boolean',
        isNullable: false,
        default: false,
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

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
