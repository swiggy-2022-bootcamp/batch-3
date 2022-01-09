import { findQuestionByPk, updateQuestion } from "../../repositories/question"
import { findUserByPk } from "../../repositories/user";
import { CustomError } from "../../utils/common/CustomError";
import { REQUIRED_EDIT_QUESTION_REPUTATION } from "../../utils/constants/reputation_constants";

export const EditQuestionService = async (userId: number, questionId: number, title: string, body: string) => {
    const oldQuestion = await findQuestionByPk(questionId);
    
    if (!oldQuestion) {
        throw new CustomError("question doesn't exist", 404);
    }

    const editorUser = await findUserByPk(userId);
    if (editorUser.reputation < REQUIRED_EDIT_QUESTION_REPUTATION) {
        throw new CustomError("you don't have required reputation to edit other user's question", 401);
    }

    let updatedTitle = "";
    if (title && title.length != 0) {
        updatedTitle = title;
    } else {
        updatedTitle = oldQuestion.title;
    }

    let updatedBody = "";
    if (body && body.length != 0) {
        updatedBody = body;
    } else {
        updatedBody = oldQuestion.body;
    }

    try {
        await updateQuestion(oldQuestion.pk, oldQuestion.userPK, updatedTitle, updatedBody, oldQuestion.votes);
    } catch (e) {
        console.log("Error: ", e);
        throw new CustomError("an error occurred while editing the question", 500);
    }
}
