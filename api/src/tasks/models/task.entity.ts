import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('task')
export class TaskEntity {
    @PrimaryGeneratedColumn() //Generate unique id
    id: number;
    
    @Column()
    user_id: number;

    @Column({ default: false})
    completed: boolean;

    @Column()
    title: string;

    @Column()
    description: string;
}