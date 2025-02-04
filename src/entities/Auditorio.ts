import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("auditoriums") 

export class Auditorium {

  @PrimaryGeneratedColumn() 
  id: number;

  @Column({ type: "varchar", nullable: false }) 
  name: string;

  @Column({ type: "int", nullable: false }) 
  capacity: number;

  @Column({ type: "varchar", nullable: false })
  location: string;

  @Column({ type: "boolean", default: false }) 
  has_projector: boolean;

  @Column({ type: "boolean", default: false }) 
  has_sound_system: boolean;

  @CreateDateColumn() 
  created_at: Date;

  @UpdateDateColumn() 
  updated_at: Date;
}