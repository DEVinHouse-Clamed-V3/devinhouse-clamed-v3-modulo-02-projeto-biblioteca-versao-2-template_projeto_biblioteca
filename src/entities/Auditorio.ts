import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Auditorio {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    capacity: number;

    @Column()
    location: string;

    @Column()
    has_projector: boolean;

    @Column()
    has_sound_system: boolean;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;
}