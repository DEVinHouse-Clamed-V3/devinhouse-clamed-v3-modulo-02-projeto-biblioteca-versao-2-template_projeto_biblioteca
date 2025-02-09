import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableLivro1738805694620 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table(
                {
                    name: 'books',
                    columns: [
                        {
                            name: 'id',
                            isPrimary: true, 
                            type: 'serial'
                        },
                        {
                            name: 'title',
                            type: 'varchar',
                            length: "150",
                            isNullable: false
                        },
                        {
                            name: 'description',
                            type: 'text'
                        },
                        {
                            name: 'publication_date',
                            type: 'date'
                        },
                        {
                            name: 'isbn',
                            type: 'varchar',
                            length: "150",
                            isNullable: false 
                        },
                        {
                            name: 'page_count',
                            type: 'int',
                        },
                        {
                            name: 'language',
                            type: 'varchar',
                            length: "150"
                        },
                        {
                            name: 'created_at',
                            type: 'timestamp',
                        },
                        {
                            name: 'updated_at',
                            type: 'timestamp',
                        },
                    ]
                }
            ), true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

