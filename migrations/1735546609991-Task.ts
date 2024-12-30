import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class  Task1735546609991 implements MigrationInterface {
  name = 'Task1735546609991'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'task',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'deletedAt',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'creatorId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'priority',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'boardId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'assignee',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'storyPoints',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'rating',
            type: 'bigInt',
            isNullable: true,
          },
          {
            name: 'type',
            type: 'varchar',
            isNullable: true,
          },
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('task', true);
  }
}