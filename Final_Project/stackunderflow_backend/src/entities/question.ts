import {
    Entity, 
    Column, 
    PrimaryGeneratedColumn
} from "typeorm";

@Entity()
export class  Questions{

    @PrimaryGeneratedColumn()
    pk: number;

    @Column()
    title: string;

    @Column({name: "user_pk"})
    userPK: number;

    @Column()
    body: string;

    @Column()
    votes: number;
}
