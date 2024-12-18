import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class User1733296130519 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'user',
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
                    name: 'updatedAt',
                    type: 'date',
                    isNullable: true,
                  },
                  {
                    name: 'deletedAt',
                    type: 'date',
                    isNullable: true,
                  },
                  {
                    name: 'firstName',
                    type: 'varchar',
                    isNullable: false,
                  },
                  {
                    name: 'lastName',
                    type: 'varchar',
                    isNullable: false,
                  },
                  {
                    name: 'email',
                    type: 'varchar',
                  },
                  {
                    name: 'password',
                    type: 'varchar',
                    isNullable: false,
                  },
                ],
            }),
            true,
        );
    }    

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user', true);
    }

}
