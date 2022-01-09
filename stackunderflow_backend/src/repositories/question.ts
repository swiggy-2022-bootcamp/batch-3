import { getRepository } from "typeorm";
import { Questions } from "../entities/question";
import { Answers } from "../entities/answer"

export const postQuestion = async (title :string, body :string, userId :number) :Promise<Questions>=> {
  console.log("Inside the user repository")
  const questionRepository = getRepository(Questions);
  return await questionRepository.save({
      body: body, 
      title: title, 
      userPK: userId
  });
};

export const postAnswer = async (userPk: number, questionId: number, answer: string) :Promise<Answers> => {
  console.log("Inside the user repository")
  const answerRepository = getRepository(Answers);
  return await answerRepository.save({
      answer: answer, 
      userPK: userPk,
      questionPK: questionId,
  });
};
