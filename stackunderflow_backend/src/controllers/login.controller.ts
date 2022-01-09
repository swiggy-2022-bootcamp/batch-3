import { Post, Route } from "tsoa";
import { UserLoginService } from "../services/login/userloginservice";
import { responseHandler } from "../utils/common/ResponseHandler";

@Route("login")
export default class LoginController {
  @Post("/")
  public async loginUser(req :any, res :any) {
      const username = req.body["username"];
      const password = req.body["password"];

      try {
        const token = await UserLoginService({username: username, password: password});
        responseHandler(res, {
          token: token
        }, 200);
      } catch (e) {
        console.log(e);
        responseHandler(res, {
          error: e.message
        }, e.statusCode);
      }
  }
}