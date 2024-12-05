import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class  User1733296130519 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'user',
                columns: [
                  {
                    name: 'id',
                    type: 'increment',
                    isPrimary: true,
                    isGenerated: true,
                  },
                  {
                    name: 'createdAt',
                    type: 'data',
                    isNullable: false,
                    default: 'now()',
                  },
                  {
                    name: 'updateAt',
                    type: 'data',
                    isNullable: true,
                  },
                  {
                    name: 'deletedAt',
                    type: 'data',
                    isNullable: true,
                  },
                  {
                    name: 'firstName',
                    type: 'varchar',
                  },
                  {
                    name: 'lastName',
                    type: 'varchar',
                  },
                  {
                    name: 'email',
                    type: 'varchar',
                  },
                  {
                    name: 'password',
                    type: 'varchar',
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
