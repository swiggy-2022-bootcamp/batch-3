const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const { query } = require("../models/db");

const createComments = async (id, isQuestionComment, comment, userId) => {
  if (!(id && comment)) {
    throw createError(400, "All input is required");
  }

  let insertClause = ``;

  if (isQuestionComment === true) {
    insertClause = `, questionId`;
  } else {
    insertClause = `, answerId`;
  }

  const addCommentQuery = `
  INSERT INTO comments (comment, userId ${insertClause})
  VALUES (?,?,?)
  `;

  const addCommentQueryParams = [comment, userId, id];

  const response = await query(addCommentQuery, addCommentQueryParams);
};

module.exports = {
  createComments,
};
