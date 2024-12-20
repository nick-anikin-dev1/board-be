import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class  Board1734604605928 implements MigrationInterface {
    name = 'Board1734604605928'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'board',
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
                    name: 'projectId',
                    type: 'int',
                    isNullable: false,
                  }
                ],
            }),
            true,
        );
    }    

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('board', true);
    }

}
