import { Answers } from "../../entities/answer";
import { addAnswerVoter, findAnswerVoter, removeAnswerVoter, updateAnswerVoter } from "../../repositories/answervoters";
import { getAnswerByPk, updateAnswer } from "../../repositories/question";
import { findUserByPk, updateUser } from "../../repositories/user";
import { CustomError } from "../../utils/common/CustomError";

export const UpvoteAnswerService = async (userId: number, answerId: number): Promise<string> => {
    const answer: Answers = await getAnswerByPk(answerId);

    if (!answer) {
        throw new CustomError("answer not found", 404);
    }

    const answerUser = await findUserByPk(answer.userPK);
    
    // User can not upvote his/her own answer
    if (answer.userPK == userId) {
        throw new CustomError("you cannot upvote your own answer", 400);
    }

    const voter = await findAnswerVoter(answerId, userId);
    // User has already voted the answer 
    if (voter) {
        if (voter.vote == 1) {
            // User has already upvoted then remove the upvote
            await updateAnswer(answer.pk, answer.userPK, answer.questionPK, answer.answer, answer.votes-1);
            await removeAnswerVoter(userId, answerId);
            await updateUser(answerUser.pk, answerUser.registrationName, answerUser.username, answerUser.password, answerUser.reputation-1);
            return "upvote removed because you already upvoted this answer";
        } else if (voter.vote == -1) {
            // User has downvoted then convert donwvote to upvote
            await updateAnswer(answer.pk, answer.userPK, answer.questionPK, answer.answer, answer.votes+2);
            await updateAnswerVoter(voter.pk, answerId, userId, 1);
            await updateUser(answerUser.pk, answerUser.registrationName, answerUser.username, answerUser.password, answerUser.reputation+2);
            return "upvoted answer successfully";
        }
    } else {
        await updateAnswer(answer.pk, answer.userPK, answer.questionPK, answer.answer, answer.votes+1);
        await addAnswerVoter(answerId, userId, 1);
        await updateUser(answerUser.pk, answerUser.registrationName, answerUser.username, answerUser.password, answerUser.reputation+1);
        return "upvoted answer successfully";
    }
}
