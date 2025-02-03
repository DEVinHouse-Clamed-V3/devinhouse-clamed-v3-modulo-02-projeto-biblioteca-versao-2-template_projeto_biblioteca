import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("auditoriums")
class Auditorio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 150, nullable: false })
  name: string;

  @Column({ type: "int" })
  capacity: number;

  @Column({ type: "varchar", length: 100 })
  location: string;

  @Column({ type: "boolean" })
  has_projector: boolean;

  @Column({ type: "boolean" })
  has_sound_system: boolean;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;
}

export default Auditorio;
