import { Get, Route, Tags } from "tsoa";
import { Users } from "../entities/user";
import {
  getUsers,
} from "../repositories/user";

@Route("users")
@Tags("User")
export default class UserController {
  @Get("/")
  public async getUsers(): Promise<Array<Users>> {
    return getUsers();
  }
}