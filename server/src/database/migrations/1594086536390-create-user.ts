import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUser1594086536390 implements MigrationInterface {
  private table = new Table({
    name: 'users',
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
        name: 'whatsapp',
        type: 'varchar',
        length: '50',
        isNullable: false,
      },
      {
        name: 'name',
        type: 'varchar',
        length: '50',
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

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
