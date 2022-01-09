const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const { query } = require("../models/db");
const { groupArray } = require("../utils/helper");

const createQuestion = async (title, body, userId) => {
  if (!(title && body)) {
    throw createError(400, "All input is required");
  }

  const isQuestionExist = await checkIfQuestionExist(title, userId);

  if (isQuestionExist === true) {
    return {
      message: "You have already created the question!",
    };
  }

  const insertQuestionQuery = `
  INSERT INTO questions (title, body, userId)
  VALUES (?,?,?)
  `;

  const insertQuestionQueryParams = [title, body, userId];

  const response = await query(insertQuestionQuery, insertQuestionQueryParams);

  const questionId = response.insertId;

  return { questionId, message: "Question posted successfully!" };
};

const checkIfQuestionExist = async (title, userId) => {
  const checkIfQuestionExistQuery = `
  SELECT questionId
  FROM questions 
  WHERE title = ? AND userId = ?
  `;

  const checkIfQuestionExistQueryParams = [title, userId];

  const response = await query(
    checkIfQuestionExistQuery,
    checkIfQuestionExistQueryParams
  );

  return !!response.length;
};

const checkIfValidQuestionId = async (questionId) => {
  const checkIfValidQuestionIdQuery = `
  SELECT questionId
  FROM questions
  WHERE questionId = ? 
  `;

  const checkIfValidQuestionIdQueryParams = [questionId];

  const response = await query(
    checkIfValidQuestionIdQuery,
    checkIfValidQuestionIdQueryParams
  );

  return !!response.length;
};

const checkIfValidAnswerId = async (answerId) => {
  const checkIfValidAnswerIdQuery = `
  SELECT answerId
  FROM answers
  WHERE answerId = ? 
  `;

  const checkIfValidAnswerIdQueryParams = [answerId];

  const response = await query(
    checkIfValidAnswerIdQuery,
    checkIfValidAnswerIdQueryParams
  );

  return !!response.length;
};

const createAnswer = async (questionId, answer, req) => {
  const isValidQuestion = await checkIfValidQuestionId(questionId);

  if (isValidQuestion === false) return { message: "Not a valid questionId" };

  const insertAnswerQuery = `
  INSERT INTO answers (questionId, answer, userId)
  VALUES (?,?,?)
  ON DUPLICATE KEY UPDATE answer = VALUES(answer)
  `;

  const insertAnswerQueryParams = [questionId, answer, req.user.userId];

  const response = await query(insertAnswerQuery, insertAnswerQueryParams);

  return {
    questionId,
    message: "Answer posted successfully!",
  };
};

const getAnswers = async () => {
  const fetchAnswerQuery = `
  SELECT sq.questionId, sq.title, sq.body, sa.answer
  FROM stackOverFlow.answers sa
  JOIN stackOverFlow.questions sq on sa.questionId = sq.questionId 
  `;

  const fetchAnswerQueryParams = [];

  const response = await query(fetchAnswerQuery, fetchAnswerQueryParams);

  const questionAnswerArray = groupArray(response);

  return [...questionAnswerArray];
};

module.exports = {
  createQuestion,
  createAnswer,
  getAnswers,
  checkIfValidAnswerId,
  checkIfValidQuestionId,
};
