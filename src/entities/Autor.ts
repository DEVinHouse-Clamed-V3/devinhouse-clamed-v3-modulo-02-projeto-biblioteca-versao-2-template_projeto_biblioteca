import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
class Autor {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column('varchar', { nullable: false })
    name!: string;

    @Column('date', { nullable: false })
    birthdate!: Date;

    @Column('text', { nullable: false })
    biography!: string;

    @Column('varchar', { nullable: false })
    nationality!: string;

    @Column('boolean', { default: true })
    active!: boolean;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}

export default Autor;