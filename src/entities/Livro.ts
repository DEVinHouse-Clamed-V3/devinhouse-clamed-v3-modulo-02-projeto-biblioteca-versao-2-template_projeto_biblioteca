import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('livros')
export class Livro {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type:'varchar', length: 100 })
    title: string;

    @Column({ type: 'text' })
    description : string;

    @Column({ type: 'date' })
    publication_date: Date;

    @Column({ type: 'varchar' , length: 100 })
    isbn : string;

    @Column({ type: 'int' })
    page_count : number;

    @Column({ type: 'varchar', length: 100 })
    language : string;

    @CreateDateColumn({ type: 'timestamp'  })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}

export default Livro;