import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class createTableAutors1738103575101 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "authors",
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'name',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'birthdate',
                    type: 'date',
                    isNullable: false,
                },
                {
                    name: 'biography',
                    type: 'text',
                    isNullable: false,
                },
                {
                    name: 'nationality',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'active',
                    type: 'boolean',
                    default: true,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()',
                },
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("authors")
    }

}
