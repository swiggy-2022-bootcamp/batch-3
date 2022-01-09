import { Questions } from "../../entities/question";
import { findQuestionByPk, updateQuestion } from "../../repositories/question"
import { addQuestionVoter, findQuestionVoter, removeQuestionVoter, updateQuestionVoter } from "../../repositories/questionvoters";
import { CustomError } from "../../utils/common/CustomError";

export const UpvoteQuestionService = async (userId: number, questionId: number): Promise<string> => {
    const question: Questions = await findQuestionByPk(questionId);

    if (!question) {
        throw new CustomError("question not found", 404);
    }
    
    // User can not upvote his/her own question
    if (question.userPK == userId) {
        throw new CustomError("you cannot upvote your own question", 400);
    }

    const voter = await findQuestionVoter(questionId, userId);
    // User has already voted the question 
    if (voter) {
        if (voter.vote == 1) {
            // User has already upvoted then remove the upvote
            await updateQuestion(question.pk, question.userPK, question.title, question.body, question.votes-1);
            await removeQuestionVoter(userId, questionId);
            return "upvote removed because you already upvoted this question";
        } else if (voter.vote == -1) {
            // User has downvoted then convert donwvote to upvote
            await updateQuestion(question.pk, question.userPK, question.title, question.body, question.votes+2);
            await updateQuestionVoter(voter.pk, questionId, userId, 1);
            return "upvoted question successfully";
        }
    } else {
        await updateQuestion(question.pk, question.userPK, question.title, question.body, question.votes+1);
        await addQuestionVoter(questionId, userId, 1);
        return "upvoted question successfully";
    }
}
