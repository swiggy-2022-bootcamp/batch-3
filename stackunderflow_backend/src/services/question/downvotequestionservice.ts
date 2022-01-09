import { Questions } from "../../entities/question";
import { findQuestionByPk, updateQuestion } from "../../repositories/question"
import { addQuestionVoter, findQuestionVoter, removeQuestionVoter, updateQuestionVoter } from "../../repositories/questionvoters";
import { findUserByPk, updateUser } from "../../repositories/user";
import { CustomError } from "../../utils/common/CustomError";
import { REQUIRED_DOWNVOTE_REPUTATION } from "../../utils/constants/required_downvote_reputation";

export const DownvoteQuestionService = async (userId: number, questionId: number): Promise<string> => {
    const question: Questions = await findQuestionByPk(questionId);

    if (!question) {
        throw new CustomError("question not found", 404);
    }

    const questionUser = await findUserByPk(question.userPK);
    
    if (questionUser.reputation < REQUIRED_DOWNVOTE_REPUTATION) {
        throw new CustomError("you don't have the required reputation to downvote", 401);
    }

    // User can not downvote his/her own question
    if (question.userPK == userId) {
        throw new CustomError("you cannot downvote your own question", 400);
    }

    const voter = await findQuestionVoter(questionId, userId);
    // User has already voted the question 
    if (voter) {
        if (voter.vote == -1) {
            // User has already downvoted then remove the downvote
            await updateQuestion(question.pk, question.userPK, question.title, question.body, question.votes+1);
            await removeQuestionVoter(userId, questionId);
            await updateUser(questionUser.pk, questionUser.registrationName, questionUser.username, questionUser.password, questionUser.reputation+1);
            return "downvote removed because you already downvoted this question";
        } else if (voter.vote == 1) {
            // User has upvoted then convert upvote to downvote
            await updateQuestion(question.pk, question.userPK, question.title, question.body, question.votes-2);
            await updateQuestionVoter(voter.pk, questionId, userId, -1);
            await updateUser(questionUser.pk, questionUser.registrationName, questionUser.username, questionUser.password, questionUser.reputation-2);
            return "downvoted question successfully";
        }
    } else {
        await updateQuestion(question.pk, question.userPK, question.title, question.body, question.votes-1);
        await addQuestionVoter(questionId, userId, -1);
        await updateUser(questionUser.pk, questionUser.registrationName, questionUser.username, questionUser.password, questionUser.reputation-1);
        return "downvoted question successfully";
    }
}
