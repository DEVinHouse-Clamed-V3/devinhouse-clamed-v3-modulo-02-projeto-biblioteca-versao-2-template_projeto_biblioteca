import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class AuditoriumsTable1738548462162 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "auditoriums",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "capacity",
            type: "int",
          },
          { name: "location", type: "varchar" },
          {
            name: "has_projector",
            type: "boolean",
          },
          {
            name: "has_sound_system",
            type: "boolean",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("auditoriums");
  }
}
