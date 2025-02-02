import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CriarTabelaAutores1738434804709 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "autores",
                columns: [
                    {
                        name: "id",
                        type: "integer",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "nome",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "data_nascimento",
                        type: "date",
                        isNullable: true
                    },
                    {
                        name: "biografia",
                        type: "text",
                        isNullable: true
                    },
                    {
                        name: "nacionalidade",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "ativo",
                        type: "boolean",
                        default: true
                    },
                    {
                        name: "data_criacao",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "data_atualizacao",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("autores");
    }
}