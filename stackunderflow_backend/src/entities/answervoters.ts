import {
    Entity, 
    Column, 
    PrimaryGeneratedColumn
} from "typeorm";

@Entity({name: "answer_voters"})
export class AnswerVoters {
    
    @PrimaryGeneratedColumn()
    pk: number;

    @Column({name: "answer_pk"})
    answerPk: number;

    @Column({name: "user_pk"})
    userPk: number;

    @Column()
    vote: number;
}
