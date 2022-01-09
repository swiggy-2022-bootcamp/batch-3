import { Answers } from "../../entities/answer";
import { addAnswerVoter, findAnswerVoter, removeAnswerVoter, updateAnswerVoter } from "../../repositories/answervoters";
import { getAnswerByPk, updateAnswer } from "../../repositories/question";
import { findUserByPk, updateUser } from "../../repositories/user";
import { CustomError } from "../../utils/common/CustomError";
import { REQUIRED_DOWNVOTE_REPUTATION } from "../../utils/constants/required_downvote_reputation";

export const DownvoteAnswerService = async (userId: number, answerId: number): Promise<string> => {
    const answer: Answers = await getAnswerByPk(answerId);

    if (!answer) {
        throw new CustomError("answer not found", 404);
    }

    const answerUser = await findUserByPk(answer.userPK);
    
    // User can not downvote his/her own answer
    if (answer.userPK == userId) {
        throw new CustomError("you cannot downvote your own answer", 400);
    }

    if (answerUser.reputation < REQUIRED_DOWNVOTE_REPUTATION) {
        throw new CustomError("you don't have the required reputation to downvote", 401);
    }

    const voter = await findAnswerVoter(answerId, userId);
    // User has already voted the answer 
    if (voter) {
        if (voter.vote == -1) {
            // User has already downvoted then remove the downvote
            await updateAnswer(answer.pk, answer.userPK, answer.questionPK, answer.answer, answer.votes+1);
            await removeAnswerVoter(userId, answerId);
            await updateUser(answerUser.pk, answerUser.registrationName, answerUser.username, answerUser.password, answerUser.reputation+1);
            return "downvote removed because you already downvoted this answer";
        } else if (voter.vote == 1) {
            // User has upvoted then convert upvote to downvote
            await updateAnswer(answer.pk, answer.userPK, answer.questionPK, answer.answer, answer.votes-2);
            await updateAnswerVoter(voter.pk, answerId, userId, -1);
            await updateUser(answerUser.pk, answerUser.registrationName, answerUser.username, answerUser.password, answerUser.reputation-2);
            return "downvoted answer successfully";
        }
    } else {
        await updateAnswer(answer.pk, answer.userPK, answer.questionPK, answer.answer, answer.votes-1);
        await addAnswerVoter(answerId, userId, -1);
        await updateUser(answerUser.pk, answerUser.registrationName, answerUser.username, answerUser.password, answerUser.reputation-1);
        return "downvoted answer successfully";
    }
}
