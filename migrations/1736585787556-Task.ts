import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Task1736585787556 implements MigrationInterface {
    name = 'Task1736585787556';

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
                        type: 'enum',
                        enum: ['Low', 'Medium', 'High'],
                        enumName: 'PriorityEnum',
                        isNullable: false,
                        default: "'Medium'",
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
                        enumName: 'statusEnum',
                        isNullable: false,
                        default: "'Backlog'",
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'assigneeId',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'storyPoints',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'estimate',
                        type: 'bigint',
                        isNullable: true,
                    },
                    {
                        name: 'type',
                        type: 'enum',
                        enum: ['Epic', 'Story', 'Task'],
                        enumName: 'typeEnum',
                        isNullable: true,
                    },
                ],
            })
        );

        await queryRunner.createForeignKey("task", new TableForeignKey({
            columnNames: ["boardId"],
            referencedColumnNames: ["id"],
            referencedTableName: "board",
            onDelete: "CASCADE",

        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('task', true, true, true);
    }
}

