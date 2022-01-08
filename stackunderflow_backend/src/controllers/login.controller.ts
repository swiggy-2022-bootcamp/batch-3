import { Post, Route } from "tsoa";
import { UserLoginService } from "../services/login/userloginservice";

@Route("login")
export default class LoginController {
  @Post("/")
  public async loginUser(req :any, res :any) {
      const username = req.body["username"];
      const password = req.body["password"];

      try {
        const token = await UserLoginService({username: username, password: password});
        res.status(200);
        res.json({
          token: token
        });
      } catch (e) {
        console.log(e);
        res.status(500).send("Internal Server Error");
      }
  }
}