import { getRepository } from "typeorm";
import { AnswerVoters } from "../entities/answervoters";

export const addAnswerVoter = async (answerId: number, userId :number, vote: number) => {
  console.log("Inside the upvote repository")
  const repository = getRepository(AnswerVoters);
  await repository.save({
    userPk: userId,
    answerPk: answerId, 
    vote: vote
  });
};

export const updateAnswerVoter = async (pk: number, answerId: number, userId :number, vote: number) => {
  console.log("Inside the upvote repository")
  const repository = getRepository(AnswerVoters);
  await repository.save({
    pk: pk,
    userPk: userId,
    answerPk: answerId, 
    vote: vote
  });
};

export const removeAnswerVoter = async (userId: number, answerId: number) => {
  console.log("Inside the upvote repository")
  const repository = getRepository(AnswerVoters);
  return await repository.delete({userPk: userId, answerPk: answerId});
};

export const findAnswerVoter = async (answerId: number, userId :number): Promise<AnswerVoters> => {
  console.log("Inside the upvote repository")
  const repository = getRepository(AnswerVoters);
  return await repository.findOne({
      where: {answerPk: answerId, userPk: userId}
  });
};
