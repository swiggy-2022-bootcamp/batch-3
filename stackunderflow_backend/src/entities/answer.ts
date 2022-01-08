import {
    Entity, 
    Column, 
    PrimaryGeneratedColumn
} from "typeorm";

@Entity()
export class Answers{

    @PrimaryGeneratedColumn()
    pk: number;

    @Column()
    answer: string;

    @Column({name: "user_pk"})
    userPK: number;

    @Column({name: "question_pk"})
    questionPK: number;
}
