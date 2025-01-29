import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Livros1738161017383 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "Livros",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                    },
                    {
                        name :"title",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name:"description",
                        type:"text"
                    },
                    {
                        name:"publication_date",
                        type:"DATE"
                    },
                    {
                        name:"isbn",
                        type:"varchar",
                        isNullable: false
                    },
                    {
                        name:"page_count",
                        type:"int"
                    },
                    {
                        name:"language",
                        type:"varchar"
                    },
                    {
                        name:"created_at",
                        type:"timestamp",
                        default: "now()"
                    },
                    {
                        
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            })
        ), true
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
