import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAuditoriums1710000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "auditoriums",
        columns: [
          { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment" },
          { name: "name", type: "varchar", isNullable: false },
          { name: "capacity", type: "int", isNullable: false },
          { name: "location", type: "varchar", isNullable: false },
          { name: "has_projector", type: "boolean", default: false },
          { name: "has_sound_system", type: "boolean", default: false },
          { name: "created_at", type: "timestamp", default: "now()" },
          { name: "updated_at", type: "timestamp", default: "now()" },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("auditoriums");
  }
}
