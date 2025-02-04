import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn() //Generate unique id
    id: number;

    @Column()
    username: string;
}