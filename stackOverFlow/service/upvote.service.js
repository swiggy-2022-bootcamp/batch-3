const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const { query } = require("../models/db");
const {
  checkIfValidAnswerId,
  checkIfValidQuestionId,
} = require("./qna.service");
const { BAD_REQUEST_HTTP_STATUS_CODE } = require("../utils/constant");

const castVote = async (id, isUpvote, isQuestionUpvote, userId) => {
  if (!(id && isUpvote !== undefined && isQuestionUpvote !== undefined)) {
    throw createError(BAD_REQUEST_HTTP_STATUS_CODE, "All input is required");
  }

  let tableName = ``;
  let whereClause = ``;

  if (isQuestionUpvote === true) {
    const isValidQuestion = await checkIfValidQuestionId(id);

    if (isValidQuestion === false) return { message: "Not a valid questionId" };

    tableName = ` questions`;
    whereClause = `AND questionId = ?`;
  } else {
    const isValidAnswer = await checkIfValidAnswerId(id);

    if (isValidAnswer === false) return { message: "Not a valid answerId" };

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

  return { message: "Vote casted successfully!" };
};

module.exports = {
  castVote,
};
