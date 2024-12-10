import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex  } from "typeorm";

export class  Project1733819819921 implements MigrationInterface {
    name = 'Project1733819819921'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users_project',
                columns: [
                  {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                  },
                  {
                    name: 'createdAt',
                    type: 'date',
                    isNullable: false,
                    default: 'now()',
                  },
                  {
                    name: 'updateAt',
                    type: 'date',
                    isNullable: true,
                  },
                  {
                    name: 'deletedAt',
                    type: 'date',
                    isNullable: true,
                  },
            ]
        }), true) 
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
                    type: 'date',
                    isNullable: false,
                    default: 'now()',
                  },
                  {
                    name: 'updateAt',
                    type: 'date',
                    isNullable: true,
                  },
                  {
                    name: 'deletedAt',
                    type: 'date',
                    isNullable: true,
                  },
                {
                    name: "alias",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "createrId",
                    type: 'int',
                    isUnique: true,
                }
            ]
        }), true) 
        await queryRunner.createTable(
            new Table({
                name: 'project_users_id_users_project',
                columns: [
                  {
                    name: 'projectId',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                  },
                  {
                    name: 'usersProjectId',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                  },
            ]
        }), true) 
        await queryRunner.createIndex("project_users_id_users_project", new TableIndex({
            name: "IDX_33e66e9687b82c1d0c4d5f8e39",
            columnNames: ["projectId"]
        }));
        await queryRunner.createIndex("project_users_id_users_project", new TableIndex({
            name: "IDX_7c50c4219c9cc26105798e1915",
            columnNames: ["usersProjectId"]
        }));
       
        await queryRunner.createForeignKey("project_users_id_users_project", new TableForeignKey({
            columnNames: ["projectId"],
            referencedColumnNames: ["id"],
            referencedTableName: "project",
            onDelete: "CASCADE"
        }));
        await queryRunner.createForeignKey("project_users_id_users_project", new TableForeignKey({
            columnNames: ["usersProjectId"],
            referencedColumnNames: ["id"],
            referencedTableName: "users_project",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("project_users_id_users_project");
        const foreignKey = table.foreignKeys.find(fk => (fk.columnNames.indexOf("projectId") !== -1) && (fk.columnNames.indexOf("usersProjectId") !== -1));
        await queryRunner.dropForeignKey("project_users_id_users_project", foreignKey);
        await queryRunner.dropIndex("project","IDX_7c50c4219c9cc26105798e1915");
        await queryRunner.dropIndex("users_project","IDX_33e66e9687b82c1d0c4d5f8e39");
        await queryRunner.dropTable('project_users_id_users_project', true);
        await queryRunner.dropTable('project', true);
        await queryRunner.dropTable('users_project', true);
    }

}
