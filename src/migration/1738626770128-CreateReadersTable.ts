import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateReadersTable1738626770128 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "readers",
        columns: [
          { name: "id", type: "serial", isPrimary: true },
          { name: "name", type: "varchar", isNullable: false },
          { name: "email", type: "varchar", isUnique: true },
          { name: "phone_number", type: "varchar" },
          { name: "birthdate", type: "date" },
          { name: "address", type: "text" },
          { name: "active", type: "boolean", default: true },
          { name: "created_at", type: "timestamp", default: "now()" },
          { name: "updated_at", type: "timestamp", default: "now()" },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("readers");
  }
}
