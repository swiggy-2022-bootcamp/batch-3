import { getRepository } from "typeorm";
import { QuestionVoters } from "../entities/questionvoters";

export const addQuestionVoter = async (questionId: number, userId :number, vote: number) => {
  const repository = getRepository(QuestionVoters);
  await repository.save({
    userPk: userId,
    questionPk: questionId, 
    vote: vote
  });
};

export const updateQuestionVoter = async (pk: number, questionId: number, userId :number, vote: number) => {
  const repository = getRepository(QuestionVoters);
  await repository.save({
    pk: pk,
    userPk: userId,
    questionPk: questionId, 
    vote: vote
  });
};

export const removeQuestionVoter = async (userId: number, questionId: number) => {
  const repository = getRepository(QuestionVoters);
  return await repository.delete({userPk: userId, questionPk: questionId});
};

export const findQuestionVoter = async (questionId: number, userId :number): Promise<QuestionVoters> => {
  const repository = getRepository(QuestionVoters);
  return await repository.findOne({
      where: {questionPk: questionId, userPk: userId}
  });
};
