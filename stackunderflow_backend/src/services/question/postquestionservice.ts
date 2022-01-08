import { Users } from "../../entities";
import {
  findUserByUsername,
} from "../../repositories/user";
import {
  postQuestion
} from "../../repositories/question";
import { Questions } from "../../entities/question";

class UserDetails {
    username: string;
    password: string;
}

class QuestionDetails {
    title: string;
    body: string;
}

interface ValidateRequestParameters {
    userDetails: UserDetails;
    questionDetails: QuestionDetails;
}

interface ProcessRequestParameters {
    userId: number;
    questionDetails: QuestionDetails;
}

export const ValidateRequest = async ({userDetails, questionDetails} : ValidateRequestParameters) :Promise<Users> => {
    const username: String = userDetails.username;
    const title: String = questionDetails.title;
    const body: String = questionDetails.body;

    console.log("username ", username);
    console.log("title ", title);
    if (username == "") {
        throw new Error("username is empty")
    }

    const user = await findUserByUsername(username);
    if (user === undefined) {
        console.log("User not found");
        throw new Error("user not found");
    }

    console.log(user);
    return user;
}

export const ProcessRequest = async ({userId, questionDetails} : ProcessRequestParameters) :Promise<Questions>=> {
    return await postQuestion(questionDetails.title, questionDetails.body, userId);
}
