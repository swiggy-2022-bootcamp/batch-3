import { findQuestionByPk, updateQuestion } from "../../repositories/question"
import { CustomError } from "../../utils/common/CustomError";

export const UpdateQuestionService = async (userId: number, questionId: number, title: string, body: string) => {
    const oldQuestion = await findQuestionByPk(questionId);
    
    if (!oldQuestion) {
        throw new CustomError("question doesn't exist", 404);
    }

    if (userId != oldQuestion.userPK) {
        throw new CustomError("you cannot update this question", 401);
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
