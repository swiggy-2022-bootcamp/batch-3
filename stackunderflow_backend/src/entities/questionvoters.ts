import {
    Entity, 
    Column, 
    PrimaryGeneratedColumn
} from "typeorm";

@Entity({name: "question_voters"})
export class QuestionVoters {
    
    @PrimaryGeneratedColumn()
    pk: number;

    @Column({name: "question_pk"})
    questionPk: number;

    @Column({name: "user_pk"})
    userPk: number;

    @Column()
    vote: number;
}
