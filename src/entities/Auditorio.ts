import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('auditorium')
class Auditorio {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:'varchar', length: 200})
    name: string;

    @Column({type: 'int'})
    capacity: number;

    @Column({type: 'varchar', length: 200})
    location: string;

    @Column({type: 'boolean', default: false})
    has_projector: boolean;

    @Column({type: 'boolean', default: false})
    has_sound_system: boolean;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}

export default Auditorio;