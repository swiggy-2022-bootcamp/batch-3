const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const { query } = require("../models/db");

const castVote = async (id, isUpvote, isQuestionUpvote, userId) => {
  if (!(id && isUpvote !== undefined && isQuestionUpvote !== undefined)) {
    throw createError(400, "All input is required");
  }

  let tableName = ``;
  let whereClause = ``;

  if (isQuestionUpvote === true) {
    tableName = ` questions`;
    whereClause = `AND questionId = ?`;
  } else {
    tableName = ` answers`;
    whereClause = `AND answerId = ?`;
  }

  const x = isUpvote === true ? "+1" : "-1";

  const castVoteQuery = `
  UPDATE ${tableName}
  SET upvotes = upvotes ${x}
  WHERE TRUE
  ${whereClause}
  `;
  const castVoteQueryParams = [id];

  const response = await query(castVoteQuery, castVoteQueryParams);

  return response;
};

module.exports = {
  castVote,
};
