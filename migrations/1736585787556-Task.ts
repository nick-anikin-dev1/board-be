import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class  Task1736585787556 implements MigrationInterface {
    name = ' Task1736585787556'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."task_priority_enum" AS ENUM('Low', 'Medium', 'High')`);
        await queryRunner.query(`CREATE TYPE "public"."task_status_enum" AS ENUM('Backlog', 'New', 'ToDo', 'In progress', 'Done')`);
        await queryRunner.query(`CREATE TYPE "public"."task_type_enum" AS ENUM('Epic', 'Story', 'Task')`);
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
                 type: 'enum',
                 enum: ['Low', 'Medium', 'High'],
                 isNullable: false,
               },
               {
                 name: 'boardId',
                 type: 'int',
                 isNullable: false,
               },
               {
                 name: 'status',
                 type: 'enum',
                 enum: ['Backlog', 'New', 'ToDo', 'In progress', 'Done'],
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
                 type: 'enum',
                 enum: ['Epic', 'Story', 'Task'],
                 isNullable: true,
               },
             ]
           })
         )  
       
        await queryRunner.createForeignKey("task", new TableForeignKey({
          columnNames: ["boardId"],
          referencedColumnNames: ["id"],
          referencedTableName: "board",
          onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('task',  true, true, true);
        await queryRunner.query(`DROP TYPE "public"."task_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."task_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."task_priority_enum"`);
    }
}