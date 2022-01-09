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

export const findQuestionByPk = async (pk: number) :Promise<Questions> => {
  console.log("Inside find question by username")
  const questionRepository = getRepository(Questions);
  console.log(pk);
  return await questionRepository.findOne({
    where: {pk: pk}
  });
} 

export const postAnswer = async (userPk: number, questionId: number, answer: string) :Promise<Answers> => {
  console.log("Inside the user repository")
  const answerRepository = getRepository(Answers);
  return await answerRepository.save({
      answer: answer, 
      userPK: userPk,
      questionPK: questionId,
  });
};

export const updateAnswer = async (answerPk: number, userPk: number, questionId: number, answer: string, votes: number) :Promise<Answers> => {
  console.log("Inside the user repository")
  const answerRepository = getRepository(Answers);
  return await answerRepository.save({
      pk: answerPk,
      answer: answer, 
      userPK: userPk,
      questionPK: questionId,
      votes: votes
  });
};

export const getAnswer = async (questionId: number, userId: number): Promise<Answers> => {
  console.log("Inside get all answer function - question repository");
  const answerRepository = getRepository(Answers);
  return await answerRepository.findOne({
    where: {questionPK: questionId, userPK: userId}
  });
}

export const getAnswerByPk = async (answerId: number): Promise<Answers> => {
  console.log("Inside get all answer function - question repository");
  const answerRepository = getRepository(Answers);
  return await answerRepository.findOne({
    where: {pk: answerId}
  });
}

export const getAllAnswer = async (questionId: number): Promise<Answers[]> => {
  console.log("Inside get all answer function - question repository");
  const answerRepository = getRepository(Answers);
  return await answerRepository.find({
    where: {questionPK: questionId}
  });
}

export const updateQuestion = async (questionPk: number, userPk: number, title: string, body: string, votes: number) :Promise<Questions> => {
  console.log("Inside the question repository");
  const repository = getRepository(Questions);
  console.log("UPVOTE QUESTION REPOO - ", userPk);
  return await repository.save({
      pk: questionPk,
      title: title,
      userPK: userPk,
      body: body,
      votes: votes
  });
};
