import { Post, Route } from "tsoa";
import { RegisterUserService } from "../services/register/registeruserservice";
import { responseHandler } from "../utils/common/ResponseHandler";

@Route("register")
export default class RegisterController {
  @Post("/")
  public async registerUser(req :any, res :any) {
      const registrationName = req.body["registration-name"];
      const username = req.body["username"];
      const password = req.body["password"];
    
      try {
        await RegisterUserService({registrationName: registrationName, username: username, password: password});
        responseHandler(res, {
          message: "user registered"
        }, 200);
      } catch(e) {
        responseHandler(res, {
          error: e.message
        }, e.statusCode);
      }
  }
}
