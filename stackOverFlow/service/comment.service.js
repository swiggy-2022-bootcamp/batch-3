const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const { query } = require("../models/db");
const {
  checkIfValidAnswerId,
  checkIfValidQuestionId,
} = require("./qna.service");
const { BAD_REQUEST_HTTP_STATUS_CODE } = require("../utils/constant");

const createComments = async (id, isQuestionComment, comment, userId) => {
  if (!(id && comment)) {
    throw createError(BAD_REQUEST_HTTP_STATUS_CODE, "All input is required");
  }

  let insertClause = ``;

  if (isQuestionComment === true) {
    const isValidQuestion = await checkIfValidQuestionId(id);

    if (isValidQuestion === false) return { message: "Not a valid questionId" };

    insertClause = `, questionId`;
  } else {
    const isValidAnswer = await checkIfValidAnswerId(id);

    if (isValidAnswer === false) return { message: "Not a valid answerId" };

    insertClause = `, answerId`;
  }

  const addCommentQuery = `
  INSERT INTO comments (comment, userId ${insertClause})
  VALUES (?,?,?)
  `;

  const addCommentQueryParams = [comment, userId, id];

  const response = await query(addCommentQuery, addCommentQueryParams);

  return {
    message: "Comment added successfully!",
  };
};

module.exports = {
  createComments,
};
