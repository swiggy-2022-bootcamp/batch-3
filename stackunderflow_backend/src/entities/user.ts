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
    username: String;

    @Column({name: "registration_name"})
    registrationName: String;

    @Column()
    password: String;

    @Column()
    reputation: number;
}
