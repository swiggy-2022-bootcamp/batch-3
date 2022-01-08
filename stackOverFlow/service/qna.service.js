const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const { query } = require("../models/db");
const { groupArray } = require("../utils/helper");

const createQuestion = async (title, body, req) => {
  if (!(title && body)) {
    throw createError(400, "All input is required");
  }
  const insertQuestionQuery = `
  INSERT INTO questions (title, body, userId)
  VALUES (?,?,?)
  `;

  const insertQuestionQueryParams = [title, body, req.user.userId];

  const response = await query(insertQuestionQuery, insertQuestionQueryParams);

  const questionId = response.insertId;

  return questionId;
};

const createAnswer = async (questionId, answer, req) => {
  const insertAnswerQuery = `
  INSERT INTO answers (questionId, answer, userId)
  VALUES (?,?,?)
  ON DUPLICATE KEY UPDATE answer = VALUES(answer)
  `;

  const insertAnswerQueryParams = [questionId, answer, req.user.userId];

  const response = await query(insertAnswerQuery, insertAnswerQueryParams);

  return;
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
};
