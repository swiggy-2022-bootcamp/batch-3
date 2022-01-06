import {
    Entity, 
    Column, 
    PrimaryGeneratedColumn
} from "typeorm";

@Entity()
export class Users {

    @PrimaryGeneratedColumn()
    pk: number;

    @Column()
    username: string;

    @Column({name: "registration_name"})
    registrationName: string;

    @Column()
    password: string;
}
