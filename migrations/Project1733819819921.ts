import { MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey } from "typeorm";

export class  Project1733916896873 implements MigrationInterface {
  name = 'Project1733916896873'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'project',
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
          name: 'updateAt',
          type: 'timestamp',
          isNullable: true,
          default: 'now()',
        },
        {
          name: 'deletedAt',
          type: 'timestamp',
          isNullable: true,
        },
        {
          name: "name",
          type: "varchar",
          isNullable: false,
        },
        {
          name: "alias",
          type: "varchar",
          isNullable: false,
          isUnique: true,
        },
        {
          name: "createrId",
          type: 'int',
        }]
      }), true
    ) 
    await queryRunner.createTable(
      new Table({
        name: 'users_projects',
        columns: [
        {
          name: 'projectId',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
        },
        {
          name: 'usersId',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
        },]
      }), true
    )    
    await queryRunner.createIndex("users_projects", new TableIndex({
      name: "IDX_667c03d5a36e0f90056b3ecb39",
      columnNames: ["projectId"]
    }));
    await queryRunner.createIndex("users_projects", new TableIndex({
      name: "IDX_7784abdb1d1df4de9504ad01c9",
      columnNames: ["userId"]
    }));
    await queryRunner.createForeignKey("users_projects", new TableForeignKey({
      columnNames: ["projectId"],
      referencedColumnNames: ["id"],
      referencedTableName: "project",
      onDelete: "CASCADE"
    }));
    await queryRunner.createForeignKey("users_projects", new TableForeignKey({
      columnNames: ["userId"],
      referencedColumnNames: ["id"],
      referencedTableName: "user",
      onDelete: "CASCADE"
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users_projects', true, true, true);
    await queryRunner.dropTable('project', true, true, true);
  }
}

