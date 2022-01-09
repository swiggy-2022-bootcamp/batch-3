import { Users } from "../../entities";
import { findUserByPk } from "../../repositories/user";
import { postQuestion } from "../../repositories/question";
import { Questions } from "../../entities/question";
import { getUserPkFromToken } from "../../utils/common/getUserPkFromToken";

class UserDetails {
    username: string;
    password: string;
}

class QuestionDetails {
    title: string;
    body: string;
}

interface ValidateRequestParameters {
    token: string;
    questionDetails: QuestionDetails;
}

interface ProcessRequestParameters {
    userId: number;
    questionDetails: QuestionDetails;
}

export const ValidateRequest = async ({token, questionDetails} : ValidateRequestParameters) :Promise<Users> => {
    const userId: number = getUserPkFromToken(token);
    const title: string = questionDetails.title;
    const body: string = questionDetails.body;

    console.log("ValidateRequest UserId: ", userId);

    const user = await findUserByPk(userId);
    if (!user) {
        throw new Error("user not found");
    }

    if (!title || !body) {
        throw new Error("question details not found")
    }

    console.log(user);
    return user;
}

export const ProcessRequest = async ({userId, questionDetails} : ProcessRequestParameters) :Promise<Questions>=> {
    return await postQuestion(questionDetails.title, questionDetails.body, userId);
}
