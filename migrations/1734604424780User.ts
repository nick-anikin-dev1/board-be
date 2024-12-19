import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class User1734604424780User implements MigrationInterface {

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
