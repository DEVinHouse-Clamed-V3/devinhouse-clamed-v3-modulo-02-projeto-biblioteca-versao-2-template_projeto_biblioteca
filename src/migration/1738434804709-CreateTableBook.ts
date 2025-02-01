import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableBook1738434804709 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.createTable(new Table({
                            name: "livros",
                            columns: [
                                {
                                    name: "id",
                                    type: "int",
                                    isPrimary: true,
                                    isGenerated: true,
                                },
                                {
                                    name: "title",
                                    type: "varchar",
                                    isNullable: false
                                },
                                {
                                    name: "description",
                                    type: "text",
                                    isNullable: true
                                },
                                {
                                    name: "publication_date",
                                    type: "date",
                                    isNullable: true
                                },
                                {
                                    name: "isbn",
                                    type: "varchar",
                                    isNullable: false
                                },
                                {
                                    name: "page_count",
                                    type: "int",
                                    isNullable: true
                                },
                                {
                                    name: "language",
                                    type: "varchar",
                                    isNullable: true
                                },
                                {
                                    name: "created_at",
                                    type: "timestamp",
                                    default: "now()"
                                },
                                {
                                    name: "updated_at",
                                    type: "timestamp",
                                    default: "now()"
                                }
                            ]
                        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("livros");
    }

}
