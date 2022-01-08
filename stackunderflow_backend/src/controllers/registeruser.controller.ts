import { Post, Route } from "tsoa";
import { RegisterUserService } from "../services/register/registeruserservice";


@Route("register")
export default class RegisterController {
  @Post("/")
  public async registerUser(req :any, res :any) {
      const registrationName = req.body["registration-name"];
      const username = req.body["username"];
      const password = req.body["password"];
    
      try {
        await RegisterUserService({registrationName: registrationName, username: username, password: password});
        res.status(200).send("User registered!")
      } catch(e) {
        console.log(e);
        res.status(500).send("Internal Server Error while logging!");
      }
  }
}