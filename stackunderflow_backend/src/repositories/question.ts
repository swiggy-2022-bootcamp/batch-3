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

export const postAnswer = async (questionId :number, answer :string) => {
  console.log("Inside the user repository")
  const answerRepository = getRepository(Answers);
  await answerRepository.save({
      answer: answer, 
      title: questionId, 
      userPK: 1,
      questionPK: 2,
  });
};
